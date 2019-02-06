"use strict";

import Auth         from './services/Auth.js'
import Utils        from './services/Utils.js'

import Home         from './views/pages/Home.js'
import About        from './views/pages/About.js'
import Error404     from './views/pages/Error404.js'
import PostShow     from './views/pages/PostShow.js'
import Login        from './views/pages/Login.js'
import Logout        from './views/pages/Logout.js'
import Register     from './views/pages/Register.js'

import Navbar       from './views/components/Navbar.js'
import Bottombar    from './views/components/Bottombar.js' 

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Home
    , '/about'      : About
    , '/p/:id'      : PostShow
    , '/login'      : Login
    , '/register'   : Register
    , '/logout'     : Logout
};

const progressbar_setWidth = (p) => {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.visibility = 'visible';
    progressBar.style.width = `${p}`;
}

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    progressbar_setWidth('60%')


    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.control();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.control();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.control();

    progressbar_setWidth('100%')
  
}

// reset the progress bar to 0 when trasition is over
document.getElementById('progress-bar').addEventListener("transitionend", () => {
    // If cluase here causes the bar to reset only when the width is 100%
    if (document.getElementById('progress-bar').style.width == '100%') {
        document.getElementById('progress-bar').style.visibility = "hidden";
        document.getElementById('progress-bar').style.width = '0%';
    }
});

export default router

