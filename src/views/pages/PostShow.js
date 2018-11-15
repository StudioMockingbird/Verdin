import Utils        from './../../services/Utils.js'

import LikePost    from '../components/LikePost.js' 
import Error404     from './Error404.js'

let getPost = async (slug) => {
    const payload = {
        "slug": slug,
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
       const response = await fetch(`http://localhost:3000/get_details_and_tags_of_post_for_anon`, options)
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
                    ${ await LikePost.render(post.data.liked_count)}
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
                    ${ post.data.tags.map(tagdetail => 
                        /*html*/`
                            ${tagdetail.name} (${tagdetail.count})
                        `
                        )
                    }
                </section>
            `
        } else if (post.status == "404" ){
            return Error404.render()
        } else {
            console.log(post)
        }
        

    }
    , after_render: async () => {
        await LikePost.after_render()
    }
}

export default PostShow;