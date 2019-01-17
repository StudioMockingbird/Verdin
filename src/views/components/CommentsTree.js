import Utils        from '../../services/Utils.js'

let getComments = async (post_id) => {
    const payload = {
        "post_id": post_id,
    }

    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
   try {
       const response = await fetch(`http://localhost:3000/get_post_comments_for_anon`, options)
    //    console.log(response)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let saveComment = async (post_id, parent_id, content) => {
    const payload = {
        "post_id"   : post_id,
        "parent_id" : parent_id,
        "content"   : content,
    }

    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
   try {
       const response = await fetch(`http://localhost:3000/create_comment`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let CommentsTree = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
    },

    render: async (postId) => {
        let comments = await getComments(postId)
        let comments_tree = await Utils.list_to_tree(comments.data)
        console.log(comments_tree)

        let comment_component =  (cdata) => 
        /*html*/`   
            <article class="media">
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/96x96.png">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>${cdata.user_nick} </strong>
                            <i class="far fa-clock"></i>
                            <small>31m ago</small>
                            <br>
                            ${cdata.content}
                            <br>
                            <small>
                                <a data-like-link-for-comment="${cdata.unqid}">Like</a> · 
                                <a data-reply-link-for-comment="${cdata.unqid}">Reply</a> · 
                                2 hrs ago
                            </small>
                        </p>
                    </div>
                    <!-- This bit adds the textbox and submit buttons to add a new comment to the tree. its hidden by default. -->
                    <article class="media is-hidden" data-input-controls-for-comment="${cdata.unqid}">
                        <figure class="media-left">
                            <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="field">
                                <p class="control">
                                    <textarea class="textarea" placeholder="Add a comment..." data-text-input-for-comment="${cdata.unqid}"></textarea>
                                </p>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <a class="button is-info" data-submit-button-for-comment="${cdata.unqid}">Submit</a>
                                    </div>
                                </div>
                    
                            </nav>
                        </div>
                    </article>
                    ${ cdata.children.map(comment => {
                            return comment_component(comment)
                        }).join('')
                    }
                </div>
            </article>
        `

        let view = 
            /*html*/`            
                <section class="section" id="commentstree_container">    
                ${ comments_tree.length > 0 
                ?
                comments_tree.map(comment => 
                    comment_component(comment)
    
                    ).join('')
                :
                /*html*/`
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <p> This post has no comments </p>
                            </div>
                        </div>
                    </article>    
                `   
                }
                </section>        
            `
        return view
    },
    after_render: async () => {

        // Handle the event when user types in the input and show the matched tags in the dropdown
        document.getElementById('commentstree_container').addEventListener('click', async (e) => {
            if (e.target.tagName == 'A') {
                if (e.target.hasAttribute('data-like-link-for-comment')) {
                    console.log("Clicked on Like for", e.target.getAttribute('data-like-link-for-comment'))
                } else if (e.target.hasAttribute('data-reply-link-for-comment')) {
                    console.log("Clicked on Reply for", e.target.getAttribute('data-reply-link-for-comment'))
                    let commentid = e.target.getAttribute('data-reply-link-for-comment')
                    let container = document.querySelector(`[data-input-controls-for-comment=${CSS.escape(commentid)}]`);
                    container.classList.toggle('is-hidden')
                    // this bit is mainly for a smoother transition. Broken in chrome
                    document.querySelector(`[data-text-input-for-comment=${CSS.escape(commentid)}]`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
                    document.querySelector(`[data-text-input-for-comment=${CSS.escape(commentid)}]`).focus();

                } else if (e.target.hasAttribute('data-submit-button-for-comment')) {
                    let commentid = e.target.getAttribute('data-submit-button-for-comment')
                    console.log("Clicked on Submit for", e.target.getAttribute('data-submit-button-for-comment'))

                    let content = document.querySelector(`[data-text-input-for-comment=${CSS.escape(commentid)}]`).value;
                    if (content =='') {
                        alert (`The content cannot be empty`)
                    } else {
                        console.log("Submitting comment", content)
                        let result = await saveComment(Utils.parseRequestURL().id, commentid, content)
                        if (result.status == "success") {
        
                            // console.log(result)
                            // alert("DINGUS")
                            // TODO - if user has a back histroy, do window.history.back()
                            window.location.hash = `/p/${result.data.post_id}`
                        // } else if (result.code == 401) {
                        //     console.log(result)
                        } else {
                            console.log(`Update Failed: ${result.errorMessage}`)
                            flash.setAttribute('data-state', 'shown')
                            flash.style.display = 'block'
                            flash.innerText = `${result.message}`
                        }
        
                    }    
                }
            }
            e.stopPropagation();
        })
    }
}

export default CommentsTree;