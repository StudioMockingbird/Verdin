let logoutUser = async () => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/logout`, options)
        console.log(response)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Logout = {
    onlyAllow: 'user',
    state: {},
    load: async function () {},
    render : async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <h1> Goodbye! Logging you out... </h1>
            </section>
        `
        return view
    },
    control: async function () {
        let result  = await logoutUser()
        let store   = window.localStorage
        if (result.status == "success") {
            store.setItem('_user_email', '')
            store.setItem('_user_nickname', '')
            store.setItem('_user_flair', '')
            console.log('Successfully logged out')
            window.location = '/'
        } else {
            console.log('Error in logging out')
            console.log(result)
        }
    }
}

export default Logout;