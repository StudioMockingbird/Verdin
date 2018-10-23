// --------------------------------
//  Define Data Sources
// --------------------------------

let getPostsList = async () => {
     const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://127.0.0.1:8529/_db/playground/auth/getAllPosts`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
    onlyAllow: 'all',
    render : async () => {
        let result = await getPostsList()
        let posts = result.data
        let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Home </h1>
                <ul>
                    ${ posts.map(post => 
                        /*html*/`<li><a href="#/p/${post._key}">${post.title}</a></li>`
                        ).join('\n ')
                    }
                </ul>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Home;