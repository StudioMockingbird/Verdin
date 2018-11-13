import Utils        from './../../services/Utils.js'
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
                    <h1> Post Id        : ${post.data.unqid}</h1>
                    <p> Post Title      : ${post.data.title} </p>
                    <p> Post Content    : ${post.data.content} </p>
                    <p> Post Author     : ${post.data.user_nick} </p>
                </section>
            `
        } else if (post.status == "404" ){
            return Error404.render()
        } else {
            console.log(post)
        }
        

    }
    , after_render: async () => {
    }
}

export default PostShow;