let Profile = {
    onlyAllow: 'user',
    render : async () => {
        let view =  /*html*/`
            <section class="section pageEntry">
                <h1> This is my Profile Page </h1>
            </section>
        `
        return view
    },
    after_render: async () => {}
        
}

export default Profile;