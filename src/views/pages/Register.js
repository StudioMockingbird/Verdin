let Register = {

    render: async () => {
        const handleSubmit = () => {
            alert('XXX')
            // let email       = document.getElementById("email_input");
            // let pass        = document.getElementById("pass_input");
            // let repeatPass  = document.getElementById("repeat_pass_input");
            // if (pass.value != repeatPass.value) {
            //     console.log ("the passwords dont match")
            // } else {
            //     console.log("form successfully submitted")
            // }     
        }

        return /*html*/ `
            <article>
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
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="register_submit_btn">
                        Register
                        </button>
                    </p>
                </div>

            </article>
     
     

        `
    }
    , after_render: async () => {
        document.getElementById("register_submit_btn").addEventListener ("click",  () => {
            console.log('Yo')
            alert('Yo')
        })
    }
}

export default Register;