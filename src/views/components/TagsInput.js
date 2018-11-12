let get_available_tags = async () => {
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(`http://localhost:3000/get_available_tags`, options)
        const json = await response.json();
        json.responseCode = response.status
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let TagsInput = {
    render: async () => {
        let view =  /*html*/`                
            <div class="field">
                <label class="label">Tags</label>
                <p class="control has-icons-left">
                    <input class="input" id="tags_input" type="text" placeholder="Enter at least 3 tags that describe this post">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                <p class="help is-danger">This email is invalid</p>
            </div>
        `
        return view
    },
    after_render: async () => {
        let tagStore = await get_available_tags()
        console.log(tagStore.data)

        let tags_field = document.getElementById("tags_input")
        tags_field.addEventListener ("input", async () => {
            let currentTextEntered = tags_field.value
            if (currentTextEntered.length > 2) {
                let matchedTags = tagStore.data.filter(item => {
                    return item.includes(currentTextEntered);
            });
            console.log("Found match with : " + matchedTags);
        }

        })
     }

}

export default TagsInput;