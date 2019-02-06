let Card = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {},
    load: async function () {},
    render: async function (post) {
        // console.log(post)
        let view =  /*html*/`                
            <div class="column is-half">
                <div class="box">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                            <p>
                                ${post.title}
                                <strong>${post.user_nick}</strong> <small>@johnsmith</small> <small>31m</small>
                                <br>
                                ${  
                                    // if content is greater than 150 chars long, truncate it and append "..."
                                    post.content.length > 150 
                                    ?
                                    (post.content).slice(0,150) + '...'
                                    :
                                    post.content
                                }
                            </p>
                            </div>
                            <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item" href="#/p/${post.unqid}">
                                <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                                </a>
                                <a class="level-item">
                                <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                            </nav>
                        </div>      
                    </article>
                </div>
            </div>
        `
        return view
    },
    control: async function () {
        // Handle controls for the post
        // document.getElementById("post_like_btn").addEventListener('click', async (e) => {
        //     console.log("Like was clicked")
        //     let result = await likePost(Utils.parseRequestURL().id)
        //     console.log(result)
        // })
        // document.getElementById("post_reply_toggle_btn").addEventListener('click', async (e) => {
        //         // ensure user is logged in to use this action
        //         // utils.redirect_to_login_if_not_loggedin()

        //     let component = document.getElementById('post_comment_field')
        //     component.classList.toggle('is-hidden')
        //     // this bit is mainly for a smoother transition. Broken in chrome
        //     document.getElementById('post_reply_txt').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        //     document.getElementById('post_reply_txt').focus();
        // })
        // document.getElementById("post_edit_btn").addEventListener('click', async (e) => {
        //     console.log("Edit was clicked")
        // })
        // document.getElementById("post_delete_btn").addEventListener('click', async (e) => {
        //     console.log("Delete was clicked")
        // })
        
        // document.getElementById("post_reply_submit").addEventListener("click", async (e) => {
        //     let post_reply_text = document.getElementById("post_reply_txt").value
        //     let result = await saveComment(Utils.parseRequestURL().id, '', post_reply_text)
        //     console.log(result)

        // })

    }
}

export default Card;

