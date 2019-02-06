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
const tagClicked = () => {
    alert("Tag clicked")
}

let TagsInput = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {
        selectedTags: []
    },

    render: async function () {
        let view =  /*html*/`                
            <div class="field">
                <label class="label">Tags</label>
                <div class="field is-grouped is-grouped-multiline" id="tags_selected_group">
                    <!-- Individual tags get added here -->
                </div>
                <p class="control has-icons-left">
                    <input class="input" id="tags_input" type="text" placeholder="Enter at least 3 tags that describe this post">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                <div class="dropdown" id="tagsinput_dropdown_menu">
                    <div class="dropdown-menu"  role="menu">
                        <div class="dropdown-content" id="tagsinput_dropdown_contnt">
                         </div>
                    </div>
                </div>
                <p class="help is-danger">This email is invalid</p>
            </div>
        `
        return view
    },
    control: async function () {
        let tagStore = await get_available_tags()
        console.log(tagStore.data)
        let matchedTags = []

        let tags_field          = document.getElementById("tags_input")
        let tags_dropdwn        = document.getElementById("tagsinput_dropdown_menu")
        let tags_dropdwn_cnt    = document.getElementById("tagsinput_dropdown_contnt")
        let tags_selected_group = document.getElementById("tags_selected_group")

        // Handle the event when user types in the input and show the matched tags in the dropdown
        tags_field.addEventListener("input", async () => {
            let currentTextEntered = tags_field.value
            if (currentTextEntered.length > 2) {
                matchedTags = tagStore.data.filter(item => {
                    return item.includes(currentTextEntered);
                });
                // remove elements which are already selected
                matchedTags = matchedTags.filter(item => !TagsInput.state.selectedTags.includes(item));

                // create dom elements for the entrie sin matched tags
                if (matchedTags.length > 0) {
                    tags_dropdwn.classList.add("is-active")
                    tags_dropdwn_cnt.innerHTML = matchedTags.map(tag => 
                        // we will use custom data-value attribute to pass the tag value
                        /*html*/`
                            <a class="dropdown-item" data-value="${tag}">
                                ${tag}
                            </a>
                        `
                        ).join('\n ')
                    console.log("Found match with : " + matchedTags);
                } else {
                    tags_dropdwn.classList.remove("is-active")
                    console.log("No match found");
                }
            }
        })

        // Handle the event where the user clicks on a tag in the dropdown
        // to avoid adding too many event listeners, we will add the listener on the parent menu instead of individual items
        tags_dropdwn_cnt.addEventListener('click', async (e) => {
            if (e.target !== e.currentTarget) {
                var tag = e.target.getAttribute("data-value");
                TagsInput.state.selectedTags.push(tag)

                // Using the new ES6 range + create frag methods for generating dom nodes from string
                let tag_node = document.createRange().createContextualFragment(
                    /*html*/`
                    <div class="control" id="tag_${tag}">
                        <div class="tags has-addons">
                            <span class="tag is-info">${tag}</span>
                            <a class="tag is-delete" data-value="${tag}"></a>
                        </div>
                    </div> 
                    `
                )
                tags_selected_group.appendChild(tag_node)
                console.log(TagsInput.state.selectedTags)

                // clear the input and hide the dropdown
                tags_field.value = ''
                tags_dropdwn.classList.remove("is-active")
            }
            e.stopPropagation();
        })

        // Handle the event where the user removes a tag
        tags_selected_group.addEventListener('click', async (e) => {
            if (e.target.tagName == 'A') {
                var tag = e.target.getAttribute("data-value");
                console.log(tag)
                TagsInput.state.selectedTags = TagsInput.state.selectedTags.filter(item => item !== tag)
                document.querySelector(`#tag_${tag}`).remove()
                console.log(TagsInput.state.selectedTags)
            }
            e.stopPropagation();
        })
    }
}

export default TagsInput;