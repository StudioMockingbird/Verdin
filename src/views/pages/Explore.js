import Card    from '../components/Card.js' 
import Utils   from '../../services/Utils.js'

// --------------------------------
//  Define Data Sources
// --------------------------------
let getPostsByTags = async (plusTags, minusTags) => {
    const payload = {
        "plus_tags": plusTags,
        "minus_tags": minusTags,
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
        const response = await fetch(`http://localhost:3000/get_posts_for_given_tags`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Explore = {
    onlyAllow: 'all',
    render: async () => {

        // Split the tags query string into lists of chosen or rejected tags
        let tagsQueryStringFromURL = Utils.parseRequestURL().id
        let tagsSplitForPlus = tagsQueryStringFromURL.split("+")
        let chosenTags = []
        let rejectedTags = []

        tagsSplitForPlus.forEach((tagStr) => {
            if (tagStr.includes("-")) {

                // Each of these tagstr actually start with a plus/chosen tag, so we can just move it to chosenTags
                // then we can split the remaining str and send all the substrings into the rejectedTags array 
                let tagsSplitForMinus = tagStr.split("-")
                chosenTags.push(tagsSplitForMinus.shift())
                tagsSplitForMinus.forEach((tag) => { 
                    rejectedTags.push(tag)
                })

            } else {
                chosenTags.push(tagStr)
            }
        })

        // Throwing away the first element in chosenTags as it will always be empty (as the query string starts with + or -)
        if (!chosenTags[0]) {
            chosenTags.shift()
        }
        console.log("chosen : " + chosenTags)
        console.log("rejected : " + rejectedTags)

     
        let result = await getPostsByTags(chosenTags, rejectedTags)
        if (result.status == "success") {
            let posts = result.data
            // Since I cannot use async-await with maps, It is beter to preprender the cards and then add them to the template
            let cards = await Promise.all(posts.map( (post) => Card.render(post)))
            let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Exploring </h1>
                <h4>  </h4>
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

export default Explore;