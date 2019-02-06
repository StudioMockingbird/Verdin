import TagsInput    from '../components/TagsInput.js' 

let create_post = async (title, link, content, tags) => {
    const payload = {
        "title"     : title,
        "link"      : link,
        "content"   : content,
        "tags"      : tags,
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
        const response = await fetch(`http://localhost:3000/create_post`, options)
        console.log(response)
        const json = await response.json();
        json.responseCode = response.status
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let PostNew = {
    onlyAllow: 'user',
    state: {},
    load: async function () {}, 
    render : async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <div class="field">
                    <label class="label">Title</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="title_input" type="text" placeholder="Enter your Title of your Post">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Link (Optional)</label>
                    <p class="control has-icons-left">
                        <input class="input" id="link_input" type="text" placeholder="Enter the link to a website that you are posting about">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>
                ${ await TagsInput.render()}

                <div class="field">
                    <label class="label">Content</label>
                    <textarea class="textarea" id="content_input" placeholder="Enter a Content of your Post"></textarea>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="newpost_submit_btn">
                        Submit
                        </button>
                    </p>
                </div>

            </section>
        `
        return view
    },
    control:  async function () {
        let flash       = document.getElementById("error_flash");
        
        // Run the after renders for the embedded components
        TagsInput.control()

        
        document.getElementById("newpost_submit_btn").addEventListener ("click", async () => {
            let title       = document.getElementById("title_input").value;
            let link        = document.getElementById("link_input").value;
            let content     = document.getElementById("content_input").value;
            let tags        = TagsInput.state.selectedTags;

            if (title =='') {
                alert (`The title cannot be empty`)
            } else {
                let result = await create_post(title, link, content, tags)
                if (result.status == "success") {

                    // console.log(result)
                    // alert("DINGUS")
                    // TODO - if user has a back histroy, do window.history.back()
                    window.location.hash = `/p/${result.data.unqid}`
                } else {
                    console.log(`Update Failed: ${result.errorMessage}`)
                    flash.setAttribute('data-state', 'shown')
                    flash.style.display = 'block'
                    flash.innerText = `${result.message}`
                }

            }    
        })
    }
        
}

export default PostNew;