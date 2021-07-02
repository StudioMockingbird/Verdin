let Booboobar = {
    render: async function () {
        let view =  /*html*/`
            <div id="booboobar" class="hidden flex justify-between h-14 mx-16 px-16 rounded-b-md bg-pink-500 items-center ">
                <p class=""> 
                    <span class="animate-pulse pr-4">💀</span> 
                    <span id="booboobar_text">Some error message goes here</span>
                </p>
                <button id="hide_booboo_btn" class="text-gray-200 px-2 py-1 border rounded-md">✕</button>
            </div>
        `
        return view
    },
    control: async function () { 
        if (window.sessionStorage.getItem("show_booboo_msg")) {
            document.getElementById("booboobar").classList.remove("hidden")
        }

        document.getElementById("hide_booboo_btn").addEventListener('click', async (e) => {
            document.getElementById("booboobar").classList.add("hidden")
            window.sessionStorage.removeItem("show_booboo_msg")
        })

    }

}

export default Booboobar;