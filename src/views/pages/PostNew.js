let PostNew = {
    onlyAllow: 'user',
    render : async () => {
        let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Add a new post </h1>
            </section>
        `
        return view
    },
    after_render: async () => {}
        
}

export default PostNew;