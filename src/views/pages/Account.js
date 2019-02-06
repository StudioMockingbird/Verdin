import Utils from './../../services/Utils.js'

// --------------------------------
//  Define api connectors
// --------------------------------
let changeNickName = async (new_nick) => {
    const payload = {
        "user_nick": new_nick,
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
        const response = await fetch(`http://localhost:3000/update_nickname`, options)
        // console.log(response)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let changeAvatar = async ( name, ext, size, b64file ) => {
    const payload = {
        "file_name": name,
        "file_size": size,
        "file_ext": ext,
        "file_b64": b64file,
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
        const response = await fetch(`http://localhost:3000/update_avatar`, options)
        // console.log(response)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let changePassword = async (old_pass, new_pass) => {
    const payload = {
        "password":     old_pass,
        "new_password": new_pass
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
        const response = await fetch(`http://localhost:3000/update_password`, options)
        // console.log(response)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

// --------------------------------
//  Main UI
// --------------------------------
let Account = {

    // --------------------------------
    //  Access Control
    // --------------------------------
    onlyAllow: 'user',

    state: {},

    load: async function() {},

    // --------------------------------
    //  HTML view
    // --------------------------------
    render: async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <div class="card">
                    <div class="card-header"><p class="card-header-title">Update Profile Info</p>
                    </div>
                    <div class="card-content">
                        <p> Hello <strong>${window.localStorage['_user_nickname']} </strong></p>
                        <p> What would you like to update? </p>
                        <br/>
                        <article class="message is-info">
                            <div class="message-header">
                                <a data-type="accordian-link">Change Nick Name</a>
                            </div>
                            <div class="message-body is-hidden">
                                <div class="field">
                                    <label class="label">This is the name everyone will see above your posts and comments</label>
                                    <div class="control">
                                        <input id="change_nickname_input" class="input" type="text" placeholder="${window.localStorage['_user_nickname']}">
                                    </div>
                                </div>
                                <button id="change_nickname_btn" class="button is-link">Submit</button>
                            </div>
                        </article>

                        <article class="message is-info">
                            <div class="message-header" >
                                <a data-type="accordian-link">Change Avatar Image</a>
                            </div>
                            <div class="message-body is-hidden">
                                <figure class="media-left">
                                    <p class="image is-128x128">
                                        <img id="avatar_preview" src="${ window.localStorage['_user_thumb']}">
                                    </p>
                                </figure>
                                </br>
                                <div class="file has-name">
                                    <label class="file-label">
                                        <input id="upload_image_input" class="file-input" type="file">
                                        <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                        <span class="file-name">
                                            <!-- Screen Shot 2017-07-29 at 15.54.25.png -->
                                        </span>
                                    </label>
                                </div>
                                </br>
                                <p> Upload an image from your computer. This is the image everyone will see on your posts and comments </p>
                                <p> (max size 100kb. Filetyep: jpg, jpeg and png. Square size preferred) </p>
                            </div>
                        </article>
                        <article class="message is-info">
                            <div class="message-header" >
                                <a data-type="accordian-link">Change Password</a>
                            </div>
                            <div class="message-body is-hidden">
                                <div class="field">
                                    <label class="label">Old Password</label>
                                    <div class="control">
                                        <input id="old_password_input" class="input" type="text" placeholder="Text input">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">New Password</label>
                                    <div class="control">
                                        <input id="new_password_input" class="input" type="text" placeholder="Text input">
                                    </div>
                                </div>
                                <button id="change_password_btn" class="button is-link">Submit</button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `
        return view
    },
    // --------------------------------
    //  Controllers
    // --------------------------------
    control: async function () {
        // Create a simple accordian component
        document.querySelectorAll('a[data-type="accordian-link"]').forEach(link => link.addEventListener('click', async (e) => {
            let accordian_body = link.closest("article").getElementsByClassName("message-body")[0];
            accordian_body.classList.toggle('is-hidden')
            accordian_body.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }))

        // Handle the event for changing nickname
        document.getElementById("change_nickname_btn").addEventListener('click', async (e) => {
            // ensure user is logged in to use this action
            // utils.redirect_to_login_if_not_loggedin()

            let new_nick = document.getElementById('change_nickname_input').value
            console.log(new_nick)
            if (new_nick == '' | new_nick.length < 5) {
                alert(`The Nickname should be at least 5 characters long`)
            } else {
                let result = await changeNickName(new_nick)
                if (result.status == 'success') {
                    window.localStorage.setItem('_user_nickname', result.data.user_nick)
                    // TODO - if user has a back histroy, do window.history.back()
                } else {
                    console.log(`Update Failed: ${result.errorMessage}`)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }
        })

        // Handle the event for changing/uploading avatar image
        const upload_image_input = document.getElementById('upload_image_input')
        upload_image_input.addEventListener('change', async (e) => {
            let img = upload_image_input.files[0]
            if (img.type == "image/png" || img.type == "image/jpeg") {
                var reader = new FileReader();
                reader.addEventListener("load", async () => {
                    var dataURL = reader.result;
                    console.log(dataURL)
                    document.getElementById("avatar_preview").src = reader.result
                    let result = await changeAvatar(img.name, img.name.split('.').pop(), img.size, dataURL)
                    if (result.status == 'success') {
                        window.localStorage.setItem('_user_thumb', result.data.user_thumb)
                        // TODO - if user has a back histroy, do window.history.back()
                        console.log(result)
                    } else {
                        console.log(`Update Failed: ${result.errorMessage}`)
                    }
                })
                reader.readAsDataURL(img);
            } else {
                console.log('Please select a valid png or jpeg file')
            }
        })

        // Handle the event for changing password
        document.getElementById("change_password_btn").addEventListener('click', async (e) => {
            let old_pass = document.getElementById('old_password_input').value
            let new_pass = document.getElementById('new_password_input').value
            if (new_pass == '' | new_pass.length < 5) {
                alert(`The Password should be at least 5 characters long`)
            } else {
                let result = await changePassword(old_pass, new_pass)
                console.log (result)
                if (result.status == 'success') {
                    console.log(`Update Succeeded: ${result}`)
                } else {
                    console.log(`Update Failed: ${result.errorMessage}`)
                    flash.setAttribute('data-state', 'shown')
                    flash.style.display = 'block'
                    flash.innerText = `${result.message}`
                }

                alert(`User with email ${email.value} was successfully submitted!`)
            }
        })
    }

}

export default Account;