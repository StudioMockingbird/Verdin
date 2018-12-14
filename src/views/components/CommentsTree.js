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
                            <br>
                            ${cdata.content}
                            <br>
                            <small>
                                <a data-like-link-for-comment="${cdata.unqid}">Like</a> · 
                                <a data-reply-link-for-comment="${cdata.unqid}">Reply</a> · 
                                 · 2 hrs
                            </small>
                        </p>
                    </div>
                    <article class="media" data-input-controls-for-comment="${cdata.unqid}" style="display:none">
                        <figure class="media-left">
                            <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="field">
                                <p class="control">
                                    <textarea class="textarea" placeholder="Add a comment..." id="reply_txt"></textarea>
                                </p>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <a class="button is-info" id="reply_submit">Submit</a>
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
                    if (container.style.display == "") {
                        container.style.display = "none";
                    } else {
                        container.style.display = "";
                    }
                }
            }
            e.stopPropagation();
        })
    }
}

export default CommentsTree;