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

let likeComment = async (comment_id) => {
    const payload = {
        "comment_id": comment_id,
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
       const response = await fetch(`http://localhost:3000/like_comment`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let read_comment_view = (comment) => 
    /*html*/`   
    <span>
    ${comment.content}
    </span>
`

let edit_comment_view = (comment) => 
    /*html*/`   
    <br>
    <div class="field">
        <textarea class="textarea" id="post_edit_content_input" data-edit-input-for-comment="${comment.unqid}" >${comment.content}</textarea>

    </div>
`

let CommentsTree = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
    },
    load: async function(postId) {
        let comments = await getComments(postId)
        // Add the flat list to state to facilitate easy searching of comment content by id
        this.state.all_comments_list = comments.data

        // Add the comments tree for visual representation
        this.state.all_comments_tree = await Utils.list_to_tree(comments.data)

        // Return empty string. else it will try to render what is returned. Should look to improve this later
        return ''
    },
    render: async function(cdata) {
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
                            <span data-comment-container-for-comment="${cdata.unqid}">
                            ${read_comment_view(cdata)}
                            </span>
                            <br>
                            <small>
                                <a data-like-link-for-comment="${cdata.unqid}">Like · </a>
                                <a data-reply-link-for-comment="${cdata.unqid}">Reply · </a>
                                <a data-bookmark-link-for-comment="${cdata.unqid}">Bookmark · </a>
                                <a data-edit-link-for-comment="${cdata.unqid}">Edit · </a>
                                <a class="is-hidden" data-edit-submit-for-comment="${cdata.unqid}">Submit · </a>
                                <a class="is-hidden" data-edit-cancel-for-comment="${cdata.unqid}">Cancel · </a> 
                                <a data-delete-link-for-comment="${cdata.unqid}">Delete · </a>
                                <a data-flag-link-for-comment="${cdata.unqid}">Flag · </a>
                                <a data-report-link-for-comment="${cdata.unqid}">Report · </a>
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
                <div id="commentstree_container">    
                    <article id="post_comment_field" class="media is-hidden" data-input-controls-for-comment="none">
                        <figure class="media-left">
                            <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="field">
                                <p class="control">
                                    <textarea class="textarea" placeholder="Add a comment..." data-text-input-for-comment="none"></textarea>
                                </p>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <a class="button is-info" data-submit-button-for-comment="none">Submit</a>
                                    </div>
                                </div>
                    
                            </nav>
                        </div>
                    </article>
                ${ this.state.all_comments_tree.length > 0 
                ?
                this.state.all_comments_tree.map(comment => 
                    comment_component(comment)
    
                    ).join('')
                :
                /*html*/`

                <p> This post has no comments </p>
 
                `   
                }
                </div>        
            `
        return view
    },
    control: async function () {

        // create a key value of the comments list for easy lookup
        // This is done in the control stage so as not to delay rendering and as this data is only useful for controls
        this.state.all_comments_keylist = await Utils.list_to_obj(this.state.all_comments_list)
        // console.log(this.state.all_comments_keylist)

        // Handle the event when user types in the input and show the matched tags in the dropdown
        document.getElementById('commentstree_container').addEventListener('click', async (e) => {
            if (e.target.tagName == 'A') {
                if (e.target.hasAttribute('data-like-link-for-comment')) {
                    console.log("Clicked on Like for", e.target.getAttribute('data-like-link-for-comment'))
                    let result = await likeComment(e.target.getAttribute('data-like-link-for-comment'))
                    if (result.status == "success") {
                        console.log(result)
                        // console.log(result)
                        // alert("DINGUS")
                        // TODO - if user has a back histroy, do window.history.back()
                        // window.location.hash = `/p/${result.data.post_id}`
                    // } else if (result.code == 401) {
                    //     console.log(result)
                    } else {
                        console.log(`Update Failed: ${result.errorMessage}`)
                        flash.setAttribute('data-state', 'shown')
                        flash.style.display = 'block'
                        flash.innerText = `${result.message}`
                    }

                } else if (e.target.hasAttribute('data-reply-link-for-comment')) {
                    console.log("Clicked on Reply for", e.target.getAttribute('data-reply-link-for-comment'))
                    let commentid = e.target.getAttribute('data-reply-link-for-comment')
                    let container = document.querySelector(`[data-input-controls-for-comment=${CSS.escape(commentid)}]`);
                    container.classList.toggle('is-hidden')
                    // this bit is mainly for a smoother transition. Broken in chrome
                    document.querySelector(`[data-text-input-for-comment=${CSS.escape(commentid)}]`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
                    document.querySelector(`[data-text-input-for-comment=${CSS.escape(commentid)}]`).focus();

                } else if (e.target.hasAttribute('data-edit-link-for-comment')) {

                    let commentid = e.target.getAttribute('data-edit-link-for-comment')
                    console.log("Clicked on Edit for Comment", commentid)
                    let container = document.querySelector(`[data-comment-container-for-comment=${CSS.escape(commentid)}]`);
                    
                    // Add the current comment content to the state object so that it can be used across all functions
                    container.innerHTML = await edit_comment_view(this.state.all_comments_keylist[commentid])
                    
                    // Show the submit and cancel buttons. Hide the edit button
                    document.querySelector(`[data-edit-link-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    document.querySelector(`[data-edit-submit-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    document.querySelector(`[data-edit-cancel-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    // container.classList.toggle('is-hidden')
                    // // this bit is mainly for a smoother transition. Broken in chrome
                    document.querySelector(`[data-edit-input-for-comment=${CSS.escape(commentid)}]`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
                    document.querySelector(`[data-edit-input-for-comment=${CSS.escape(commentid)}]`).focus();

                } else if (e.target.hasAttribute('data-edit-submit-for-comment')) {

                    let commentid = e.target.getAttribute('data-edit-submit-for-comment')
                    console.log("Clicked on Edit-Submit for Comment", commentid)
                    let container = document.querySelector(`[data-comment-container-for-comment=${CSS.escape(commentid)}]`);

                } else if (e.target.hasAttribute('data-edit-cancel-for-comment')) {

                    let commentid = e.target.getAttribute('data-edit-cancel-for-comment')
                    console.log("Clicked on Edit-Cancel for Comment", commentid)
                    let container = document.querySelector(`[data-comment-container-for-comment=${CSS.escape(commentid)}]`);
                    container.innerHTML = await read_comment_view(this.state.all_comments_keylist[commentid])

                    // Show the submit and cancel buttons. Hide the edit button
                    document.querySelector(`[data-edit-link-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    document.querySelector(`[data-edit-submit-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    document.querySelector(`[data-edit-cancel-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')

                } else if (e.target.hasAttribute('data-submit-button-for-comment')) {
                    let commentid = e.target.getAttribute('data-submit-button-for-comment')
                    console.log("Clicked on Submit for", e.target.getAttribute('data-submit-button-for-comment'))

                    let content = document.querySelector(`[data-text-input-for-comment=${CSS.escape(commentid)}]`).value;
                    if (content =='') {
                        alert (`The content cannot be empty`)
                    } else {
                        console.log("Submitting comment", content)
                        let cid = (commentid == "none") ? '' : commentid
                        let result = await saveComment(Utils.parseRequestURL().id, cid, content)
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