import Utils        from './../../services/Utils.js'

let likePost = async (post_id) => {
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
       const response = await fetch(`http://localhost:3000/like_post`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let LikePost = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
        selectedTags: []
    },

    render: async function (count) {
        let view =  /*html*/`                
            <a class="button is-danger is-outlined" id="like_post_btn">
                <span class="icon is-small">
                    <i class="far fa-heart"></i>
                    ${count ? count : 0}
                </span>
            </a>
        `
        return view
    },
    control: async function () {
        // Get the post id
        let postId = Utils.parseRequestURL().id

        // Handle the event when user types in the input and show the matched tags in the dropdown
        document.getElementById("like_post_btn").addEventListener ("click", async () => {

            let result = await likePost(postId)
            if (result.status == 'success') {
                console.log('Post liked')
            } else if (result.status == 401) {
                console.log("401 came")
            } else {
                console.log (`Like Failed: ${result.message}`)
            }
        })
    }
}

export default LikePost;