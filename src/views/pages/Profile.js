let Profile = {
    onlyAllow: 'user',
    state:{}, 
    load: async function () {},
    render : async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <h1> This is my Profile Page </h1>
            </section>
        `
        return view
    },
    control: async function () {}
        
}

export default Profile;