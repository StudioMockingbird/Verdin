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
        const response = await fetch(`http://localhost:3000/get_homepage_posts_for_anon`, options)
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
        if (result.status == "success") {
            let posts = result.data
            let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Home </h1>
                <ul>
                    ${ posts.map(post => 
                        /*html*/`<li><a href="#/p/${post.unqid}">${post.title}</a></li>`
                        ).join('\n ')
                    }
                </ul>
            </section>
        `
        return view
        } else {
            console.log(result)
        }

    }
    , after_render: async () => {
    }

}

export default Home;