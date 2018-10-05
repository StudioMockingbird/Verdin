import Home         from './views/pages/Home'
import About        from './views/pages/About'
import Error404     from './views/pages/Error404'

let req = {
    resource    : null,
    id          : null,
    verb        : null
}

const routes = {
    '/'         : Home
    , '/about'  : About
    // , '/p/:id'  : PostShow

};

const router = async () => {
    // Lazy load view element:
    const content = null || document.getElementById('page_container');
    // Current route url (getting rid of '#' in hash as well):
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    req.resource    = r[1] ? r[1] : null
    req.id          = r[2] ? r[2] : null
    req.verb        = r[3] ? r[3] : null

    console.log(req)
    // Get route by url:
    let page = routes[url] ? routes[url] : Error404
    content.innerHTML = await page.render();
  
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
