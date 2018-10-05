import Home         from './views/pages/Home'
import About        from './views/pages/About'
import Error404     from './views/pages/Error404'
import PostShow     from './views/pages/PostShow'

import Utils        from './services/Utils'

const routes = {
    '/'         : Home
    , '/about'  : About
    , '/p/:id'  : PostShow

};

const router = async () => {
    // Lazy load view element:
    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL()
    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get route by url:
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
  
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
