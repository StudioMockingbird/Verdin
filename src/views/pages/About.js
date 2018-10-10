let About = {
    render : async () => {
        let view =  /*html*/
            `
            <h1> About </h1>
            <button id="myBtn" type="button" >Try it</button> 
            `
        return view
    },
    after_render: async () => {
        document.getElementById("myBtn").addEventListener ("click",  () => {
            console.log('Yo')
            alert('Yo')
        })
    }
        
}

export default About;