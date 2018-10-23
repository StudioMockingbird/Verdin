// On page render check if the user is logged in
let checkAuthStatus = async () => {
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await fetch(`http://127.0.0.1:8529/_db/playground/auth/amiloggedin`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let logoutUser = async () => {
    const options = {
        method: 'GET',
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

let Auth = {
    check : async () => {
        let store       = window.localStorage
        // console.log(store['_user_username'])
        if (store['_user_username']) {
            let authStatus = await checkAuthStatus()
            // console.log(store.getItem('_user_username'))
            store.setItem('_user_username', authStatus.data.username)
            store.setItem('_user_nickname', authStatus.data.nickname)
            store.setItem('_user_flair', authStatus.data.flair)
        } else {
            store.setItem('_user_username', null)
            store.setItem('_user_nickname', null)
            store.setItem('_user_flair', null)
        }
    },
    logout : async () => {
        store.setItem('_user_username', null)
        store.setItem('_user_nickname', null)
        store.setItem('_user_flair', null)

        logoutUser()
    }
}

export default Auth;