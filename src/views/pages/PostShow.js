import Utils        from './../../services/Utils'

let PostShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        
        return `<h1> Post Id : ${request.id}</h1>`
    }
}

export default PostShow;