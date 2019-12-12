import Utils        from '../../services/Utils.js'
import Report       from '../components/Report.js' 

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

let changeComment = async (comment_id, content) => {
    const payload = {
        "comment_id"    : comment_id,
        "new_content"   : content,
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
       const response = await fetch(`http://localhost:3000/update_comment`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let comment_component =  (cdata) => 
/*html*/`   

    <article class="media" style="margin-top:0px" data-base-container-for-comment="${cdata.unqid}">
        <figure class="media-left">
            <!-- <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/96x96.png">
            </p> -->
        </figure>
        <div class="media-content">
            <div class="content">
                <p>

                    <small class="has-text-grey-light">                    
                        ${cdata.user_nick} said · 31m ago
                    </small>
                    <br>
                    <span data-comment-container-for-comment="${cdata.unqid}">
                    ${read_comment_view(cdata)}
                    </span>
                    <br>
                    <small>
                        <a class="has-text-danger" data-like-link-for-comment="${cdata.unqid}">Like · </a>
                        <a data-reply-link-for-comment="${cdata.unqid}">Reply · </a>
                        <a class="has-text-grey-light" data-bookmark-link-for-comment="${cdata.unqid}">Bookmark · </a>
                        <a class="has-text-grey-light" data-edit-link-for-comment="${cdata.unqid}">Edit · </a>
                        <a class="has-text-grey-light is-hidden" data-edit-submit-for-comment="${cdata.unqid}">Submit · </a>
                        <a class="has-text-grey-light is-hidden" data-edit-cancel-for-comment="${cdata.unqid}">Cancel · </a> 
                        <a class="has-text-grey-light" data-delete-link-for-comment="${cdata.unqid}">Delete · </a>
                        <a class="has-text-grey-light" data-flag-link-for-comment="${cdata.unqid}">Flag · </a>
                        <a class="has-text-grey-light" data-report-link-for-comment="${cdata.unqid}">Report · </a>
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
                    <small>
                        <a data-submit-button-for-comment="${cdata.unqid}">Submit</a>
                    </small>
                </div>
            </article>
            <span data-child-comment-container-for-comment="${cdata.unqid}">
            ${ cdata.children.map(comment => {
                    return comment_component(comment)
                }).join('')
            }
            </span>
        </div>
    </article>
`

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
        <textarea class="textarea" data-edit-input-for-comment="${comment.unqid}" >${comment.content}</textarea>

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

        let view = 
            /*html*/`            
                <div id="commentstree_container">    
                    <!-- <article id="post_comment_field" class="media is-hidden" data-input-controls-for-comment="none">
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
                            <a data-submit-button-for-comment="none">Submit</a>
                        </div>
                    </article> -->
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
            // register the flash component
            let flash = document.getElementById('error_flash')

            // This style of event handling means we need to add only 1 listener instead of hundreds of them
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
                        console.log(`Update Failed: ${result.message}`)
                        flash.classList.toggle('is-hidden')
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
                    let new_content = document.querySelector(`[data-edit-input-for-comment=${CSS.escape(commentid)}]`).value

                    // Now set these updated values in the state
                    this.state.all_comments_keylist[commentid].content = new_content

                    console.log(this.state.all_comments_keylist[commentid])
        
                    // and rerender the read post view
                    container.innerHTML = await read_comment_view(this.state.all_comments_keylist[commentid])
        
                    // and fire the api call to update the same in the db
                    let result = await changeComment(commentid, new_content)
                    if (result.status == 'success') {
                        console.log(`Update Succeeded: ${result}`)
                        // window.location.hash = `/p/${result.data.unqid}`
                    } else {
                        console.log(`Update Failed: ${result.message}`)
                        flash.classList.toggle('is-hidden')
                        flash.innerText = `${result.message}`
                        flash.scrollIntoView({behavior: 'smooth'})
                    }

                    // Show the submit and cancel buttons. Hide the edit button
                    document.querySelector(`[data-edit-link-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    document.querySelector(`[data-edit-submit-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')
                    document.querySelector(`[data-edit-cancel-for-comment=${CSS.escape(commentid)}]`).classList.toggle('is-hidden')

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
                        let new_comment = {}
                        // Add a temp id to this. This temp id is needed as we want to update this node later 
                        // when the api response comes through
                        new_comment.unqid = 'tempid' + Date.now()
                        new_comment.content = content
                        new_comment.children = []
                        new_comment.user_nick = window.localStorage['_user_nickname']


                        // the new comment is rendered differently if its a top level comment vs a child level comment
                        let parentid = (commentid == "none") ? '' : commentid
                        if (parentid) {
                            document.querySelector(`[data-child-comment-container-for-comment=${CSS.escape(parentid)}]`).innerHTML = comment_component(new_comment)
    
                            let container = document.querySelector(`[data-input-controls-for-comment=${CSS.escape(parentid)}]`);
                            container.classList.toggle('is-hidden')
                            // this bit is mainly for a smoother transition. Broken in chrome
                            document.querySelector(`[data-text-input-for-comment=${CSS.escape(parentid)}]`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

                        } else {
                            let new_comment_node = document.createRange().createContextualFragment(comment_component(new_comment))

                            let commentstree_container = document.getElementById('commentstree_container')
                            commentstree_container.insertBefore(new_comment_node, commentstree_container.childNodes[1])

                            let component = document.getElementById('post_comment_field')
                            component.classList.toggle('is-hidden')
                            // and clean up the textarea in case user adds another root level comment
                            document.querySelector(`[data-text-input-for-comment='none']`).value = ''

                            // this bit is mainly for a smoother transition. Broken in chrome
                            document.getElementById('commentstree_container').scrollIntoView({ behavior: 'smooth' })
                        }
                        let result = await saveComment(Utils.parseRequestURL().id, parentid, content)
                        if (result.status == "success") {
                            // add an empty children attribute to the result data as our map in render func expects this
                            result.data.children =[]
                            // now update the new comments and change their commentid from the temp value to what we get from api
                            let temp_node = document.querySelector(`[data-base-container-for-comment=${CSS.escape(new_comment.unqid)}]`)
                            let real_node = document.createRange().createContextualFragment(comment_component(result.data))
                            console.log(real_node)
                            temp_node.parentNode.replaceChild(real_node, temp_node);
                            console.log("temp comment updated with real node")
                        } else {
                            console.log(`Update Failed: ${result.message}`)
                            flash.classList.toggle('is-hidden')
                            flash.style.display = 'block'
                            flash.innerText = `${result.message}`
                        }
        
                    }    
                } else if (e.target.hasAttribute('data-report-link-for-comment')) {
                    let commentid = e.target.getAttribute('data-report-link-for-comment')
                    console.log("Report clicked for", e.target.getAttribute('data-report-link-for-comment'))
                        document.getElementById("report_container").innerHTML = await Report.render("comment", 
                        this.state.all_comments_keylist[commentid].user_nick, 
                        this.state.all_comments_keylist[commentid].content, 
                        this.state.all_comments_keylist[commentid].unqid);
                    await Report.control();
                    
                }
            }
            e.stopPropagation();
        })
    }
}

export default CommentsTree;