let Screamerbar = {
    render: async function () {
        let view =  /*html*/`
            <div id="screamerbar" class="hidden flex justify-between h-8 px-16 bg-yellow-400 items-center ">
                <p>
                    <span class="animate-pulse pr-4">📣</span> 
                    <span id="screamerbar_text">Some important notification goes here!</span>
                </p>
                <button id="hide_info_btn" class="">✕</button>
            </div>
        `
        return view
    },
    control: async function () { 
        document.getElementById("hide_info_btn").addEventListener('click', async (e) => {
            document.getElementById("screamerbar").classList.toggle('hidden')
        })

    }

}

export default Screamerbar;