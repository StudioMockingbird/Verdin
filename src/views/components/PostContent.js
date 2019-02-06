import Utils        from '../../services/Utils.js'
import PostEditControls from './PostEdit.js'

// let saveComment = async (post_id, parent_id, content) => {
//     const payload = {
//         "post_id"   : post_id,
//         "parent_id" : parent_id,
//         "content"   : content,
//     }

//     const options = {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//     };
//    try {
//        const response = await fetch(`http://localhost:3000/create_comment`, options)
//        const json = await response.json();
//        console.log(json)
//        return json
//    } catch (err) {
//        console.log('Error getting documents', err)
//    }
// }

// let changePost = async (post_id, title, link, content) => {
//     const payload = {
//         "post_id"       : post_id,
//         "new_title"     : title,
//         "new_link"      : link,
//         "new_content"   : content,
//     }

//     const options = {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//     };
//    try {
//        const response = await fetch(`http://localhost:3000/update_post`, options)
//        const json = await response.json();
//        console.log(json)
//        return json
//    } catch (err) {
//        console.log('Error getting documents', err)
//    }
// }

// let likePost = async (post_id) => {
//     const payload = {
//         "post_id"   : post_id
//     }

//     const options = {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//     };
//    try {
//        const response = await fetch(`http://localhost:3000/like_post`, options)
//        const json = await response.json();
//        console.log(json)
//        return json
//    } catch (err) {
//        console.log('Error getting documents', err)
//    }
// }
let PostContent = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
    },

    render: async function (post) {
        let view =  /*html*/`                
            <h3 class="title is-3" id="post_title_label">${post.data.title}</h3>
            by <strong>${post.data.user_nick}</strong> 
            <i class="far fa-clock"></i>
            <small>31m ago</small>
            <br>
            <br>
            <p style="">
            <figure  >
                <p class="image is-128x128">
                <img src="http://via.placeholder.com/256x256">
                </p>
            </figure>
            ${post.data.content}
            </p>
        `
        
        return view
    },
    control: async function () {
        let flash       = document.getElementById("error_flash");



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

