let Navbar = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                        </a>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item" href="/#/about">
                                About
                            </a>
                            <a class="navbar-item" href="/#/secret">
                                Secret
                            </a>
                        </div>
                        <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="control has-icons-right">
                                <input class="input is-fullwidth" type="text" placeholder="Search for posts...">

                                <span class="icon is-small is-right">
                                    <i class="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                            <div class="navbar-item">
                            ${ window.localStorage['_user_email']
                ?
                                /*html*/`<div class="field is-grouped" id="show_onauth_navitems">
                                    <div class="control">
                                        <a class="button is-primary" href="/#/p/new">
                                        <span class="icon"> <i class="fas fa-plus-square"></i> </span>

                                        <span>New Post</span>
                                        </a>
                                        
                                    </div>
                                    <div class="control">
                                        <a class="button is-light" href="/#/logout">
                                        <span class="icon"> <i class="fas fa-sign-out-alt"></i> </span>

                                        <span>Logout</span>
                                        </a>
                                    </div>
                                </div>`
                :

                                /*html*/`<div class="field is-grouped" id="hide_onauth_navitems">
                                    <div class="control">
                                        <a class="button is-primary" href="/#/register">
                                            <span class="icon"> <i class="fas fa-user-plus"></i> </span>

                                            <span>Sign up</span>
                                        </a>
                                    </div>
                                    <div class="control">
                                        <a class="button is-light" href="/#/login">
                                        <span class="icon"> <i class="fas fa-sign-in-alt"></i> </span>

                                        <span>Log in</span>
                                        </a>
                                    </div>
                                </div>`
            }
    
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `
        return view
    },
    after_render: async () => { }

}

export default Navbar;