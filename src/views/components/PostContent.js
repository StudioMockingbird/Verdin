import Utils        from '../../services/Utils.js'
import PostEditControls from '../components/PostEditControls.js'

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

let changePost = async (post_id, title, link, content) => {
    const payload = {
        "post_id"       : post_id,
        "new_title"     : title,
        "new_link"      : link,
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
       const response = await fetch(`http://localhost:3000/update_post`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let likePost = async (post_id) => {
    const payload = {
        "post_id"   : post_id
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
       const response = await fetch(`http://localhost:3000/like_post`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let read_post_view = (title, link, content) => {
    /*html*/`                
    <h3 class="title is-3" id="post_title_label">${title}</h3>
    <article class="media" id="read_post_container">

        <figure class="media-left">
            <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>${post.data.user_nick}</strong> 
                    <i class="far fa-clock"></i>
                    <small>31m ago</small>
                    <br>
                </p>
                <p id="post_content_label">
                ${content}
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item" id="post_like_btn">
                        <span class="icon is-small"><i class="far fa-heart"></i></span>
                        &nbsp Like &nbsp
                    </a>
                    <a class="level-item" id="post_reply_toggle_btn">
                        <span class="icon is-small"><i class="far fa-comment-alt"></i></span>
                        &nbsp Reply &nbsp
                    </a>


                </div>
                <div class="level-right is-hidden" data-visible-to="${post.data.user_id}">
                    <a class="level-item" id="post_edit_btn" >
                        <span class="icon is-small"><i class="fas fa-edit"></i></span>
                        &nbsp EDIT &nbsp
                    </a>
                    <a class="level-item" id="post_delete_btn">
                        <span class="icon is-small"><i class="far fa-trash-alt"></i></span>
                        &nbsp Delete &nbsp
                    </a>
                </div>
            </nav>
        </div>
        
    </article>
    `
}

let edit_post_view = (title, link, content) => {
    /*html*/`                
    <h3 class="title is-3" id="post_title_label">${post.data.title}</h3>
    <article class="media" id="read_post_container">

        <figure class="media-left">
            <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>${post.data.user_nick}</strong> 
                    <i class="far fa-clock"></i>
                    <small>31m ago</small>
                    <br>
                </p>
                <p id="post_content_label">
                ${post.data.content}
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item" id="post_like_btn">
                        <span class="icon is-small"><i class="far fa-heart"></i></span>
                        &nbsp Like &nbsp
                    </a>
                    <a class="level-item" id="post_reply_toggle_btn">
                        <span class="icon is-small"><i class="far fa-comment-alt"></i></span>
                        &nbsp Reply &nbsp
                    </a>


                </div>
                <div class="level-right is-hidden" data-visible-to="${post.data.user_id}">
                    <a class="level-item" id="post_edit_btn" >
                        <span class="icon is-small"><i class="fas fa-edit"></i></span>
                        &nbsp EDIT &nbsp
                    </a>
                    <a class="level-item" id="post_delete_btn">
                        <span class="icon is-small"><i class="far fa-trash-alt"></i></span>
                        &nbsp Delete &nbsp
                    </a>
                </div>
            </nav>
        </div>
        
    </article>
    <article id="edit_post_container" class="is-hidden">
        <div class="field">
            <label class="label">Title</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input" id="post_edit_title_input" type="text" placeholder="Enter your Title of your Post" value="${post.data.title}">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </p>
            <p class="help is-danger">This email is invalid</p>
        </div>

        <div class="field">
            <label class="label">Link (Optional)</label>
            <p class="control has-icons-left">
                <input class="input" id="post_edit_link_input" type="text" placeholder="Enter the link to a website that you are posting about" value="${post.data.link}">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
            <p class="help is-danger">This email is invalid</p>
        </div>

        <div class="field">
            <label class="label">Content</label>
            <textarea class="textarea" id="post_edit_content_input" placeholder="Enter a Content of your Post" >${post.data.content}</textarea>
            <p class="help is-danger">This email is invalid</p>
        </div>

        <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item" id="post_edit_submit">
                        <span class="icon is-small"><i class="far fa-heart"></i></span>
                        &nbsp Submit &nbsp
                    </a>
                </div>
                <div class="level-right is-hidden" data-visible-to="${post.data.user_id}">
                    <a class="level-item" id="post_edit_cancel" >
                        <span class="icon is-small"><i class="fas fa-edit"></i></span>
                        &nbsp Cancel &nbsp
                    </a>
                </div>
            </nav>
    </article>
    <article class="media is-hidden" id="post_comment_field">
        <figure class="media-left">
            <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="field">
                <p class="control">
                    <textarea class="textarea" placeholder="Add a comment..." id="post_reply_txt"></textarea>
                </p>
            </div>
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <a class="button is-info" id="post_reply_submit">Submit</a>
                    </div>
                </div>
    
            </nav>
        </div>
    </article>
    `
}


let PostContent = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
    },

    render: async function (post) {
        let view =  /*html*/`                
            
            <article class="media" id="read_post_container">
            <h3 class="title is-3" id="post_title_label">${post.data.title}</h3>
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                    </p>
                </figure>
                
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>${post.data.user_nick}</strong> 
                            <i class="far fa-clock"></i>
                            <small>31m ago</small>
                            <br>
                        </p>
                        <p id="post_content_label">
                        ${post.data.content}
                        </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" id="post_like_btn">
                                <span class="icon is-small"><i class="far fa-heart"></i></span>
                                &nbsp Like &nbsp
                            </a>
                            <a class="level-item" id="post_reply_toggle_btn">
                                <span class="icon is-small"><i class="far fa-comment-alt"></i></span>
                                &nbsp Reply &nbsp
                            </a>


                        </div>
                        <div class="level-right is-hidden" data-visible-to="${post.data.user_id}">
                            <a class="level-item" id="post_edit_btn" >
                                <span class="icon is-small"><i class="fas fa-edit"></i></span>
                                &nbsp EDIT &nbsp
                            </a>
                            <a class="level-item" id="post_delete_btn">
                                <span class="icon is-small"><i class="far fa-trash-alt"></i></span>
                                &nbsp Delete &nbsp
                            </a>
                        </div>
                    </nav>
                </div>
                
            </article>
            <article id="edit_post_container" class="is-hidden">
                <div class="field">
                    <label class="label">Title</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="post_edit_title_input" type="text" placeholder="Enter your Title of your Post" value="${post.data.title}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Link (Optional)</label>
                    <p class="control has-icons-left">
                        <input class="input" id="post_edit_link_input" type="text" placeholder="Enter the link to a website that you are posting about" value="${post.data.link}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Content</label>
                    <textarea class="textarea" id="post_edit_content_input" placeholder="Enter a Content of your Post" >${post.data.content}</textarea>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" id="post_edit_submit">
                                <span class="icon is-small"><i class="far fa-heart"></i></span>
                                &nbsp Submit &nbsp
                            </a>
                        </div>
                        <div class="level-right is-hidden" data-visible-to="${post.data.user_id}">
                            <a class="level-item" id="post_edit_cancel" >
                                <span class="icon is-small"><i class="fas fa-edit"></i></span>
                                &nbsp Cancel &nbsp
                            </a>
                        </div>
                    </nav>
            </article>
            <article class="media is-hidden" id="post_comment_field">
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="field">
                        <p class="control">
                            <textarea class="textarea" placeholder="Add a comment..." id="post_reply_txt"></textarea>
                        </p>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="button is-info" id="post_reply_submit">Submit</a>
                            </div>
                        </div>
            
                    </nav>
                </div>
            </article>
        `
        
        return view
    },
    control: async function () {
        let flash       = document.getElementById("error_flash");

        // Default visibility of elements for the current user
        let current_user_id = window.localStorage['_user_id']
        document.querySelectorAll('[data-visible-to="' + CSS.escape(current_user_id) + '"]').forEach(node => {
            node.classList.remove('is-hidden')
        })

        // Handle controls for the post
        document.getElementById("post_like_btn").addEventListener('click', async (e) => {
            console.log("Like was clicked")
            let result = await likePost(Utils.parseRequestURL().id)
            console.log(result)
        })
        document.getElementById("post_reply_toggle_btn").addEventListener('click', async (e) => {
                // ensure user is logged in to use this action
                // utils.redirect_to_login_if_not_loggedin()

            let component = document.getElementById('post_comment_field')
            component.classList.toggle('is-hidden')
            // this bit is mainly for a smoother transition. Broken in chrome
            document.getElementById('post_reply_txt').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
            document.getElementById('post_reply_txt').focus();
        })
        
        document.getElementById("post_edit_btn").addEventListener('click', async (e) => {
            console.log("Edit was clicked")
            document.getElementById("read_post_container").classList.toggle('is-hidden')
            document.getElementById("edit_post_container").classList.toggle('is-hidden')
        })
        
        document.getElementById("post_edit_cancel").addEventListener('click', async (e) => {
            console.log("Edit was clicked")
            document.getElementById("read_post_container").classList.toggle('is-hidden')
            document.getElementById("edit_post_container").classList.toggle('is-hidden')
        })

        document.getElementById("post_delete_btn").addEventListener('click', async (e) => {
            console.log("Delete was clicked")
        })

        document.getElementById("post_edit_submit").addEventListener("click", async (e) => {
            let post_title_text     = document.getElementById("post_edit_title_input").value
            let post_link_text      = document.getElementById("post_edit_link_input").value
            let post_content_text   = document.getElementById("post_edit_content_input").value
            // Now set these updated values in the post
            document.getElementById("post_title_label").innerText = post_title_text
            // document.getElementById("post_title_label").innerText = post_link_text
            document.getElementById("post_title_label").innerText = post_content_text

            // and fire the api call to update the same in the db
            let result = await changePost(Utils.parseRequestURL().id, post_title_text, post_link_text, post_content_text)
            if (result.status == 'success') {
                console.log(`Update Succeeded: ${result}`)
                // window.location.hash = `/p/${result.data.unqid}`
            } else {
                console.log(`Update Failed: ${result.errorMessage}`)
                flash.classList.toggle('is-hidden')
                flash.innerText = `${result.message}`
            }
        })

        document.getElementById("post_reply_submit").addEventListener("click", async (e) => {
            let post_reply_text = document.getElementById("post_reply_txt").value
            let result = await saveComment(Utils.parseRequestURL().id, '', post_reply_text)
            if (result.status == 'success') {
                console.log(`Update Succeeded: ${result}`)
            } else {
                console.log(`Update Failed: ${result.errorMessage}`)
                flash.classList.toggle('is-hidden')
                flash.innerText = `${result.message}`
            }

        })

    }
}

export default PostContent;

