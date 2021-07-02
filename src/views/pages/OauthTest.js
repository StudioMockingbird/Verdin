let temp_details = async () => {
    const payload = {
        "foo": "bar",
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
        const response = await fetch(`http://127.0.01:3000/api/v1/oauth/googlesignin`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let OauthTest = {
    onlyAllow: 'all',
    state:{},
    load : function () {},
    render : async function () {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div id="error_flash" class="notification is-danger is-hidden" ></div>
                <h1> This page is for testing Oauth integrations </h1>

                <div id="g_id_onload"
                    data-client_id="326093643211-dh58srqtltvqfakqta4us0il2vgnkenr.apps.googleusercontent.com"
                    data-login_uri="http://localhost:3000/api/v1/oauth/googlesignin"
                    data-auto_prompt="false"
                    data-nonce="monique">
                </div>
                <div class="g_id_signin"
                    data-type="standard"
                    data-size="large"
                    data-theme="filled_blue"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div>

                <button id="temp_details_btn">Testing post conections</button>
            </section>
        `
        return view
    },
    control: async function () {
        var gsiscript = document.createElement( 'script' );
        gsiscript.setAttribute( 'src', "https://accounts.google.com/gsi/client");
        gsiscript.async = true
        gsiscript.defer = true
        document.body.appendChild( gsiscript );

        document.getElementById("temp_details_btn").addEventListener("click", async () => {
            temp_details()
        })
    }
        
}

export default OauthTest;