// --------------------------------
//  Define Data Sources
// --------------------------------

let posts_list = async () => {
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

let plist = [{"id":"1","createdAt":"2018-10-04T12:51:56.032Z","name":"Matilda Kessler","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/superoutman/128.jpg","title":"Concrete firewall Vision-oriented","content":"navigate"},{"id":"2","createdAt":"2018-10-04T05:27:22.341Z","name":"Alexie Lindgren","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/petrangr/128.jpg","title":"Refined Wooden Shirt programming Rustic","content":"Credit Card Account"},{"id":"3","createdAt":"2018-10-04T09:30:26.458Z","name":"Kendra Gottlieb","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/txcx/128.jpg","title":"COM","content":"compress Personal Loan Account portals"},{"id":"4","createdAt":"2018-10-03T20:32:58.147Z","name":"Demond Frami","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/desastrozo/128.jpg","title":"Borders Minnesota Iraq","content":"Garden"},{"id":"5","createdAt":"2018-10-03T23:57:09.603Z","name":"Chyna Walker","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/vonachoo/128.jpg","title":"Rustic Wooden Mouse Plastic Refined Concrete Sausages","content":"hierarchy next generation"}]

let Home = {
    render : async () => {
        let posts = await posts_list()
        console.log(posts)
        let list_posts = posts.map(post => `<li>${post.title}</li>`).join('\n ')
        let view =  `
            <h1> Home </h1>
            <ul>
                <li> Post titles </li>
                ${ list_posts}
            </ul>
        `
        return view
    }
}


export default Home;