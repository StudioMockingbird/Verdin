let login_user = async (email, password) => {
    const payload = {
        "username": email,
        "password": password,
      }
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(`http://127.0.0.1:8529/_db/playground/auth/login`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Login = {

    render: async () => {
        return /*html*/ `
            <section class="section pageEntry">
                <!-- <form id="login_form"> -->
                <div id="error_flash" class="notification is-danger" data-state="hidden" style="display:none;">
                    <button class="delete"></button>
                    Error: The Email or the Password that you enetered is wrong!
                </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" id="email_input" type="email" placeholder="Enter your Email" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                        <p class="help is-danger">This email is invalid</p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" id="pass_input" type="password" placeholder="Enter the Password" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="help is-danger">This email is invalid</p>
                    </div>

                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" id="login_submit_btn">
                            Login
                            </button>
                        </p>
                    </div>
                <!-- </form> -->
            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("login_submit_btn").addEventListener ("click", async () => {
            let email       = document.getElementById("email_input").value;
            let pass        = document.getElementById("pass_input").value;
            let flash       = document.getElementById("error_flash");
            let store       = window.localStorage

            if (email =='' | pass == '' ) {
                alert (`The fields cannot be empty`)
            } else {
                let result = await login_user(email, pass)
                if (result.success == true) {
                    store.setItem('_user_username', result.data.username)
                    store.setItem('_user_nickname', result.data.nickname)
                    store.setItem('_user_flair', result.data.flair)
                    window.location = '/'
                } else if (result.code == 401) {
                    flash.setAttribute('data-state', 'shown')
                    flash.style.display = 'block'
                } else {
                    alert (`Login Failed: ${result.errorMessage}`)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })
    }
}

export default Login;