let create_user = async (email, nick, password) => {
    const payload = {
        "user_email"    : email,
        "password"      : password,
        "user_nick"     : nick,
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
        // const response = await fetch(`http://127.0.0.1:8529/_db/playground/auth/signup`, options)
        const response = await fetch(`http://localhost:3000/register`, options)
        console.log(response)
        const json = await response.json();
        // json.responseCode = response.status
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Register = {
    onlyAllow: 'anon',
    state: {},
    load: async function () {}, 
    render: async function () {
        return /*html*/ `
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="email_input" type="email" placeholder="Enter your Email">
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
                        <input class="input" id="nickname_input" type="text" placeholder="Enter a Nickname that everyone can see">
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
                        <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="register_submit_btn">
                        Register
                        </button>
                    </p>
                </div>

            </section>
        `
    },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    control: async function () {
        document.getElementById("register_submit_btn").addEventListener ("click", async () => {
            let email       = document.getElementById("email_input").value;
            let nick        = document.getElementById("nickname_input").value;
            let pass        = document.getElementById("pass_input").value;
            let repeatPass  = document.getElementById("repeat_pass_input").value;
            if (pass != repeatPass) {
                alert (`The passwords dont match`)
            } else if (email =='' | nick =='' | pass == '' | repeatPass == '') {
                alert (`The fields cannot be empty`)
            } else {
                let result = await create_user(email, nick, pass)
                if (result.status == 'success') {
                // if (result.success == true) {
                    alert (`User with emailid ${email} was successfully created`)
                } else {
                    alert (`Failed: ${result.message}`)
                    flash.classList.toggle('is-hidden')
                    flash.innerText = `${result.message}`
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })
    }
}

export default Register;