import Utils        from './../../services/Utils.js'
import Error404     from './Error404.js'

let getPost = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://127.0.0.1:8529/_db/playground/auth/getPost/${id}`, options)
       const json = await response.json();
    //    console.log(json)
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

        if (post.success) {
            return /*html*/`
                <section class="section pageEntry">
                    <h1> Post Id        : ${post.data._key}</h1>
                    <p> Post Title      : ${post.data.title} </p>
                    <p> Post Content    : ${post.data.content} </p>
                    <p> Post Author     : ${post.data.author} </p>
                </section>
            `
        } else {
            return Error404.render()
        }
        

    }
    , after_render: async () => {
    }
}

export default PostShow;