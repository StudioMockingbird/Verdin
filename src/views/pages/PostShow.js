import Utils        from './../../services/Utils.js'

import LikePost     from '../components/LikePost.js' 
import TagsList     from '../components/TagsList.js' 
import PostContent  from '../components/PostContent.js' 

import Error404     from './Error404.js'
import CommentsTree from '../components/CommentsTree.js';


let getPost = async (post_id) => {
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
       const response = await fetch(`http://localhost:3000/get_post_details_for_anon`, options)
    //    console.log(response)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostShow = {
    onlyAllow: 'all',
    state: {},
    load: async function () {},
    render : async function () {
        let request = Utils.parseRequestURL()
        let post = await getPost(request.id)

        if (post.status == "success") {
            return /*html*/`
                <section class="section pageEntry">
                    <div id="error_flash" class="notification is-danger is-hidden" ></div>
                    ${ await PostContent.render(post)}
      
                    <article class="media">
                        <div class="media-content">
                        ${await TagsList.render(post.data.tags)}
                        </div>
                    </article>

                    <!-- ${ await LikePost.render(post.data.liked_count)} -->

                    ${ await CommentsTree.load(request.id)}
                    ${ await CommentsTree.render()}

                </section>
            `
        } else if (post.status == "404" ){
            return Error404.render()
        } else {
            console.log(post)
        }
        

    },
    control: async function () {
        await PostContent.control()
        // await LikePost.control()
        await TagsList.control()
        await CommentsTree.control()

    }
}

export default PostShow;