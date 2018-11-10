let TagsInput = {
    render: async () => {
        let view =  /*html*/`
            <div id="error_flash" class="notification is-danger" data-state="hidden" style="display:none;">
                <button class="delete"></button>
                Error: The Email or the Password that you entered is wrong!
            </div>
        `
        return view
    },
    after_render: async () => { }

}

export default TagsInput;