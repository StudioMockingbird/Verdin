"use strict";

import Utils        from './services/Utils.js'

import Home         from './views/pages/Home.js'
import Explore      from './views/pages/Explore.js'
import About        from './views/pages/About.js'
import Error404     from './views/pages/Error404.js'
import PostNew      from './views/pages/PostNew.js'
import PostShow     from './views/pages/PostShow.js'
import Profile      from './views/pages/Profile.js'
import Signin       from './views/pages/Signin.js'
import Signout      from './views/pages/Signout.js'
import Signup       from './views/pages/Signup.js'
import Account      from './views/pages/Account.js'
import Secret       from './views/pages/Secret.js'
import OauthTest    from './views/pages/OauthTest.js'

import Progressbar  from './views/components/Progressbar.js'
import Screamerbar  from './views/components/Screamerbar.js'
import Searchbar    from './views/components/Searchbar.js'
import Filtersbar   from './views/components/Filtersbar.js'
import Booboobar    from './views/components/Booboobar.js' 
import Happybar     from './views/components/Happybar.js' 
import SideBar      from './views/components/SideBar.js'
import Bottombar    from './views/components/Bottombar.js' 


// --------------------------------
//  List of supported routes. 
//  Any url other than these routes will throw a 404 error
// --------------------------------
const routes = {
    '/'                 : Home
    , '/about'          : About
    , '/secret'         : Secret
    , '/oauth'          : OauthTest
    , '/p/:param'       : PostShow
    , '/p/new'          : PostNew
    , '/u/me/signin'    : Signin
    , '/u/me/signup'    : Signup
    , '/u/me/signout'   : Signout
    , '/t/:param'       : Explore
    // , '/u/me/'     : Signout
    , '/me/account'     : Account
    // , '/u/me/posts'     : Signout
    // , '/u/me/comments'     : Signout
    // , '/u/:param/'     : Signout
    // , '/u/:param/posts'     : Signout
    // , '/u/:param/comments'     : Signout
    , '/u/me/profile'   : Profile
};

// --------------------------------
//  The router code. 
//  Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
// --------------------------------
const router = async () => {
    
    // Lazy load view element:
    // const progressbar_div   = null || document.getElementById('progressbar_container');
    const screamerbar_div   = null || document.getElementById('screamerbar_container');
    const searchbar_div     = null || document.getElementById('searchbar_container');
    const filtersbar_div    = null || document.getElementById('filtersbar_container');
    const booboobar_div     = null || document.getElementById('booboobar_container');
    const happybar_div      = null || document.getElementById('happybar_container');
    const content_div       = null || document.getElementById('pagecontent_container');
    const sidebar_div       = null || document.getElementById('sidebar_container');
    const footer_div        = null || document.getElementById('footer_container');
    
    // Add all the page components

    // In the curious case of the Progressbar, we will not insert the snippet into the HTML as we had to hardcode it in my index.html file
    // Otheriwse the starting transition is not working.
    // progressbar_div.innerHTML = await Progressbar.render();
    await Progressbar.control();
    await Progressbar.animateStart();

    screamerbar_div.innerHTML = await Screamerbar.render();
    await Screamerbar.control();

    searchbar_div.innerHTML = await Searchbar.render();
    await Searchbar.control();

    filtersbar_div.innerHTML = await Filtersbar.render();
    await Filtersbar.control();

    booboobar_div.innerHTML = await Booboobar.render();
    await Booboobar.control();

    happybar_div.innerHTML = await Happybar.render();
    await Happybar.control();

    sidebar_div.innerHTML = await SideBar.render();
    await SideBar.control();

    footer_div.innerHTML = await Bottombar.render();
    await Bottombar.control();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()
    
    // Check if the route already exists, if it does, then render that page
    // If not then check if it is a dynamic route. If yes, then parse the url, else route to 404
    // Parse the URL and if it has an id part, change it with the string ":param"
    let parsedURL = 
        routes[location.hash.slice(1).toLowerCase() || '/']
        ?
        (location.hash.slice(1).toLowerCase() || '/')
        :
        ((request.resource ? '/' + request.resource : '/') + (request.id ? '/:param' : '') + (request.verb ? '/' + request.verb : ''))
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404

    console.log(page)

    // Client side Auth Guard
    // If the page has a onlyAllow property, reoute the page appropriately or send user to Signin page
    if (page.onlyAllow == 'user') {
        // console.log('Only User')
        page = window.localStorage['_user_email'] ? page : Signin

    } else if (page.onlyAllow == 'anon') {
        // console.log('Only Anon')
        page = !window.localStorage['_user_email'] ? page : Home
    } 
    // load page data
    await page.load();
    // render page view
    content_div.innerHTML = await page.render();
    // register page controls
    await page.control();

    // End the Progress bar animation as the page has finished loading 
    await Progressbar.animateEnd();
 
}

// List of all housekeepings services to run on new server request
const houseKeeping = () => {
    router()
}

// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', houseKeeping);



