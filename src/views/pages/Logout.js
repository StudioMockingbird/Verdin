let logoutUser = async () => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await fetch(`http://127.0.0.1:8529/_db/playground/auth/logout`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Logout = {
    render : async () => {
        let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Goodbye! Logging you out... </h1>
            </section>
        `
        return view
    },
    after_render: async () => {
        let store       = window.localStorage

        // store.setItem('_user_username', null)
        // store.setItem('_user_nickname', null)
        // store.setItem('_user_flair', null)

        let result = await logoutUser()
        if (result.success) {
            console.log('Successfully logged out')
        } else {
            console.log('Error in logging out')
            console.log(result)
        }
        window.location = '/'
    }
}

export default Logout;