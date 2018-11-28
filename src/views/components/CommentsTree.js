import Utils        from '../../services/Utils.js'

let getComments = async (post_id) => {
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
       const response = await fetch(`http://localhost:3000/get_post_comments_for_anon`, options)
    //    console.log(response)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let CommentsTree = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
    },

    render: async (postId) => {
        let comments = await getComments(postId)
        let comments_tree = await Utils.list_to_tree(comments.data)
        console.log(comments_tree)

        let comment_component =  (cdata) => 
        /*html*/`   
            <article class="media">
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/96x96.png">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>${cdata.user_nick} </strong>
                            <br>
                            ${cdata.content}
                            <br>
                            <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                        </p>
                    </div>
                    ${ cdata.children.map(comment => {
                            return comment_component(comment)
                        }).join('')
                    }
                </div>
            </article>
        `

        let view = 
            /*html*/`            
                <section class="section" id="commentstree_container">    
                ${ comments_tree.length > 0 
                ?
                comments_tree.map(comment => 
                    comment_component(comment)
    
                    ).join('')
                :
                /*html*/`
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <p> This post has no comments </p>
                            </div>
                        </div>
                    </article>    
                `   
                }
                </section>        
            `
        return view
    },
    after_render: async () => {

        // Handle the event when user types in the input and show the matched tags in the dropdown
        document.getElementById('commentstree_container').addEventListener('click', async (e) => {
            if (e.target.tagName == 'A') {
                console.log(e.target.innerText)

            }
            e.stopPropagation();
        })
    }
}

export default CommentsTree;