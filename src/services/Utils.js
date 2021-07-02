const Utils = { 
    // --------------------------------
    //  Redirect to a given path with optional messages
    // --------------------------------
    redirectTo : ({path, booboomsg, happinessmsg}) => {
        window.location = path 
        window.onhashchange = function() {
              if (booboomsg) {
                document.getElementById("booboobar").classList.remove("hidden")
                document.getElementById("booboobar_text").innerText = booboomsg
            }

            if (happinessmsg) {
                document.getElementById("happybar").classList.remove("hidden")
                document.getElementById("happybar_text").innerText = happinessmsg
            }
        }
    }

    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    , parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    // --------------------------------
    //  Time ago
    // --------------------------------
    , timeAgo: (time) => {
        console.log(Date.now() - Date.parse(time))
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    list_to_tree: async (docs) => {
    
        var tree = [],
            childrenOf = {};
        var item, id, parentId;
    
        docs.forEach((item) => {

            id = item.unqid;
            parentId = item.parent_id || 0;
            item.level = 0;

            // every item may have children
            childrenOf[id] = childrenOf[id] || [];

            // init its children
            item.children = childrenOf[id];
            if (parentId != 0) {

                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];

                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        })
        // console.log(tree)
        return tree;
    },

    list_to_obj: async (docs) => {
    
        return docs.reduce((obj, item) => (obj[item.unqid] = item, obj) ,{});
    }
}

export default Utils;