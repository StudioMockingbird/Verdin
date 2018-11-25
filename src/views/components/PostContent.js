import Utils        from '../../services/Utils.js'

// let likePost = async (post_id) => {
//     const payload = {
//         "post_id": post_id,
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
                        <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                        </a>
                        <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-heart"></i></span>
                        </a>
                    </div>
                    <div class="level-right">
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>

                    </div>
                    </nav>
                </div>
                
            </article>
            <article class="media">
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
                    <div class="field">
                    <p class="control">
                        <button class="button" id="post_reply_btn">Post comment</button>
                    </p>
                    </div>
                </div>
            </article>

        `
        return view
    },
    after_render: async () => {
        // Get the post id
        // let postId = Utils.parseRequestURL().id

        // // Handle the event when user types in the input and show the matched tags in the dropdown
        // document.getElementById("like_post_btn").addEventListener ("click", async () => {

        //     let result = await likePost(postId)
        //     if (result.status == 'success') {
        //         console.log('Post liked')
        //     } else if (result.status == 401) {
        //         console.log("401 came")
        //     } else {
        //         console.log (`Like Failed: ${result.message}`)
        //     }
        // })
    }
}

export default PostContent;