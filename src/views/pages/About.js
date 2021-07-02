let About = {
    onlyAllow: 'all',
    state:{},
    load : function () {},
    render : async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <h1> About </h1>
            </section>
        `
        return view
    },
    control: async function () {}
        
}

export default About;