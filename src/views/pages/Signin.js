import Utils from "../../services/Utils.js";

let signin_user = async (email, password) => {
    const payload = {
        "email": email,
        "password": password,
    }
    const options = {
        method: 'POST',
        credentials: 'include',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
        },
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/signin`, options)
        return response
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Signin = {
    onlyAllow: 'anon',
    state: {},
    load: async function () { },
    render: async function () {
        return /*html*/ `
            <section class="section pageEntry col-span-3 bg-primary-light rounded shadow-md">
                <div class="py-16 px-16 space-y-4">
                    <h2 class="text-center text-3xl font-extrabold text-gray-200">
                        Signin to Digglu
                    </h2>
                    <input type="email" id="email_input" placeholder="&nbsp &nbsp Enter your Email Address"
                        class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light"/>

                    <input type="password" id="pass_input" placeholder="&nbsp &nbsp Enter a Password"
                        class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light"/>


                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-white ">
                            <label for="remember_me" class="ml-2 block text-sm text-gray-100">
                            Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-gray-200 underline">
                            Forgot your password?
                            </a>
                        </div>
                    </div>

                    <button type="button" id="signin_submit_btn" class="p-2 w-1/3 bg-danger-light text-lg font-bold text-gray-200"> Signin </button>
                </div>
            </section>
        `
    },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    control: async function () {
        document.getElementById("signin_submit_btn").addEventListener("click", async () => {
            let email       = document.getElementById("email_input").value;
            let pass        = document.getElementById("pass_input").value;

            if (email == '' | pass == '') {
                alert(`The fields cannot be empty`)
            } else {
                // Start the progress on button click
                // const progressBar = document.getElementById('progress-bar');
                // progressBar.style.transition = 'width 1.5s';
                // progressBar.style.visibility = 'visible';
                // progressBar.style.width = `60%`;

                let response = await signin_user(email, pass)
                switch (response.status) {
                    case 202:
                        var result = await response.json()
                        console.log(result)

                        window.localStorage.setItem('auth_type',  result.data.auth_type)
                        window.localStorage.setItem('email',      result.data.email)
                        window.localStorage.setItem('nick',       result.data.nick)
                        window.localStorage.setItem('flair',      result.data.flair)
                        window.localStorage.setItem('thumb',      result.data.thumb)
                        window.localStorage.setItem('role',       result.data.role)
                        window.localStorage.setItem('level',      result.data.level)
                        window.localStorage.setItem('stars',      result.data.stars)

                        // TODO - if user has a back history, do window.history.back()
                        // window.location = '/'
                        Utils.redirectTo({path: `/#/about`, happinessmsg: `You were successfully logged in`})
                        break;

                    case 401:
                        booboobar.classList.remove('hidden')
                        boobootxt.innerText = `The entered email or password is wrong. Please verify and try again`
                        break;

                    case 403:
                        var result = await response.json()
                        console.log(result)
                        booboobar.classList.remove('hidden')
                        boobootxt.innerText = `${result.message}`
                        break;

                    default:
                        booboobar.classList.remove('hidden')
                        boobootxt.innerText = `502 orcs are laying siege to your castle!`

                        // Utils.redirectTo(`/#/about`, `this is a boo boo doll`)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }
        })
    }
}

export default Signin;