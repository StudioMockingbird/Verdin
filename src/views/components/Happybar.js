let Happybar = {
    render: async function () {
        let view =  /*html*/`
            <div id="happybar" class="hidden flex justify-between h-14 mx-16 px-16 rounded-b-md bg-green-600 items-center ">
                <p class=""> 
                    <span class="animate-pulse pr-4">👍</span> 
                    <span id="happybar_text">Some success message goes here</span>
                </p>
                <button id="hide_happiness_btn" class="text-gray-200 px-2 py-1 border rounded-md">✕</button>
            </div>
        `
        return view
    },
    control: async function () { 
        document.getElementById("hide_happiness_btn").addEventListener('click', async (e) => {
            document.getElementById("happybar").classList.toggle('hidden')
        })

    }

}

export default Happybar;