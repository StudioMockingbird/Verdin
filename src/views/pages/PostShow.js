import Utils        from './../../services/Utils.js'

import LikePost     from '../components/LikePost.js' 
import TagsList     from '../components/TagsList.js' 
import PostContent  from '../components/PostContent.js' 

import Error404     from './Error404.js'

let savePostReply = async (post_id, parent_id, level, content) => {
    const payload = {
        "post_id"   : post_id,
        "parent_id" : parent_id,
        "level"     : level,
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
    render : async () => {
        let request = Utils.parseRequestURL()
        let post = await getPost(request.id)

        if (post.status == "success") {
            return /*html*/`
                <section class="section pageEntry">
                ${ await PostContent.render(post)}
      
                    <article class="media">
                        <div class="media-content">
                        ${await TagsList.render(post.data.tags)}
                        </div>
                    </article>

                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
   
                                <p>
                                    <figure class="image image is-48x48">
                                        <img src="https://via.placeholder.com/48x48">
                                        
                                    </figure>
                                    <strong>Barbara Middleton</strong>
                                    <br>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                                    <br>
                                    <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                                </p>
                            </div>

                        </div>
                    </article>


                    <!-- ${ await LikePost.render(post.data.liked_count)} -->
                    <p> Post Id             : ${post.data.unqid}</p>
                    <p> Post Title          : ${post.data.title} </p>
                    <p> Post Content        : ${post.data.content} </p>
                    <p> Post Author_id      : ${post.data.user_id} </p>
                    <p> Post Author_nick    : ${post.data.user_nick} </p>
                    <p> Post Author         : ${post.data.user_nick} </p>
                    <p> Post Link           : ${post.data.link} </p>
                    <p> Post Liked Count    : ${post.data.liked_count} </p>
                    <p> Post Created at     : ${post.data.created_at} </p>
                    <p> Post Tags           : </p>

                </section>
            `
        } else if (post.status == "404" ){
            return Error404.render()
        } else {
            console.log(post)
        }
        

    }
    , after_render: async () => {
        await PostContent.after_render()
        // await LikePost.after_render()
        await TagsList.after_render()

        let post_reply_text = document.getElementById("post_reply_txt").value
        document.getElementById("post_reply_btn").addEventListener("click", async () => {
            let result = await savePostReply(Utils.parseRequestURL().id, '', 0, post_reply_text)
            console.log(result)

        })
    }
}

export default PostShow;