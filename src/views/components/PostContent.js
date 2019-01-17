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

let PostContent = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
    },

    render: async (post) => {
        console.log(post)
        let view =  /*html*/`                
            <h3 class="title is-3">${post.data.title}</h3>
            <article class="media">

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
                    
                    ${post.data.content}
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

            ${await PostEditControls.render(post.data.title, post.data.link, post.data.content)}

        `
        return view
    },
    after_render: async () => {
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
        })

        document.getElementById("post_delete_btn").addEventListener('click', async (e) => {
            console.log("Delete was clicked")
        })

        document.getElementById("post_reply_submit").addEventListener("click", async (e) => {
            let post_reply_text = document.getElementById("post_reply_txt").value
            let result = await saveComment(Utils.parseRequestURL().id, '', post_reply_text)
            if (result.status == 'success') {
                console.log(`Update Succeeded: ${result.errorMessage}`)
            } else {
                console.log(`Update Failed: ${result.errorMessage}`)
                flash.setAttribute('data-state', 'shown')
                flash.style.display = 'block'
                flash.innerText = `${result.message}`
            }

        })

    }
}

export default PostContent;

