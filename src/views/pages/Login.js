let login_user = async (email, password) => {
    const payload = {
        "user_email":   email,
        "password":     password,
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
        const response = await fetch(`http://localhost:3000/login`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Login = {
    onlyAllow: 'anon',
    state: {},
    load: async function () {},
    render: async function () {
        return /*html*/ `
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <!-- <form id="login_form"> -->
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
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" id="pass_input" type="password" placeholder="Enter the Password" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-key"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <a href="#" class="button"> <i class="fas fa-eye-slash"></i> </a>
                                
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
    },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    control: async function () {
        document.getElementById("login_submit_btn").addEventListener ("click", async () => {
            let email       = document.getElementById("email_input").value;
            let pass        = document.getElementById("pass_input").value;
            let flash       = document.getElementById("error_flash");
            let store       = window.localStorage

            if (email =='' | pass == '' ) {
                alert (`The fields cannot be empty`)
            } else {
                // Start the progress on button click
                const progressBar = document.getElementById('progress-bar');
                progressBar.style.transition='width 1.5s';
                progressBar.style.visibility = 'visible';
                progressBar.style.width = `60%`;
            
                let result = await login_user(email, pass)
                if (result.status == 'success') {
                    store.setItem('_user_email',    result.data.user_email)
                    store.setItem('_user_id',       result.data.user_id)
                    store.setItem('_user_nickname', result.data.user_nick)
                    store.setItem('_user_flair',    result.data.user_flair)
                    store.setItem('_user_thumb',    result.data.user_thumb)

                    
                    // TODO - if user has a back histroy, do window.history.back()
                    window.location = '/'
                } else if (result.status == 401) {
                    flash.classList.toggle('is-hidden')
                    flash.innerText = `${result.message}`
                } else {
                    console.log (`Login Failed: ${result.errorMessage}`)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })
    }
}

export default Login;