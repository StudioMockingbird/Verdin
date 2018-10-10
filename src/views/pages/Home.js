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
        const response = await fetch(`http://5bb634f6695f8d001496c082.mockapi.io/api/posts`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
    render : async () => {
        let posts = await getPostsList()
        let view =  /*html*/`
            <h1> Home </h1>
            <ul>
                ${ posts.map(post => 
                    `<li><a href="#/p/${post.id}">${post.title}</a></li>`
                    ).join('\n ')
                }
            </ul>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Home;