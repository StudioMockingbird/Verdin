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
    onlyAllow: 'user',
    render : async () => {
        let view =  /*html*/`
            <section class="section pageEntry">
                <h1> Goodbye! Logging you out... </h1>
            </section>
        `
        return view
    },
    after_render: async () => {
        let result  = await logoutUser()
        let store   = window.localStorage
        if (result.success) {
            store.setItem('_user_username', '')
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