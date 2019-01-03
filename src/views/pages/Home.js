import Card    from '../components/Card.js' 

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
    render: async () => {
        let result = await getPostsList()
        if (result.status == "success") {
            let posts = result.data
            // Since I cannot use async-await with maps, It is beter to preprender the cards and then add them to the template
            let cards = await Promise.all(posts.map( (post) => Card.render(post)))
            let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Home </h1>
                
                <div class="columns is-multiline" id="cards_container">
                ${cards.join('\n ')}
                </div>
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