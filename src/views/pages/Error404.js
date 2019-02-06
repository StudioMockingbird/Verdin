let Error404 = {
    onlyAllow: 'all',
    state: {},
    load: async function () {},
    render : async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <h1> 404 Error </h1>
            </section>
        `
        return view
    },
    control: async function () {
    }
}
export default Error404;