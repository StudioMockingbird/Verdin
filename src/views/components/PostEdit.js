let PostEditControls = {
    render: async function(title, link, content) {
        let view =  /*html*/`
            <article id="edit_post_container" class="is-hidden">
                <div class="field">
                    <label class="label">Title</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="post_edit_title_input" type="text" placeholder="Enter your Title of your Post" value="${post.data.title}">
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
                        <input class="input" id="post_edit_link_input" type="text" placeholder="Enter the link to a website that you are posting about" value="${post.data.link}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Content</label>
                    <textarea class="textarea" id="post_edit_content_input" placeholder="Enter a Content of your Post" >${post.data.content}</textarea>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" id="post_edit_submit">
                                <span class="icon is-small"><i class="far fa-heart"></i></span>
                                &nbsp Submit &nbsp
                            </a>
                        </div>
                        <div class="level-right is-hidden" data-visible-to="${post.data.user_id}">
                            <a class="level-item" id="post_edit_cancel" >
                                <span class="icon is-small"><i class="fas fa-edit"></i></span>
                                &nbsp Cancel &nbsp
                            </a>
                        </div>
                    </nav>
            </article>
        `
        return view
    },
    control: async function () { }

}

export default PostEditControls;