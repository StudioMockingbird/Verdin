let Filtersbar = {
    render: async function () {
        let view =  /*html*/`
            <header class="bg-secondary-light ">
                <div class="mx-16 flex items-center justify-between ">
                    <div class="py-2 flex items-baseline space-x-4">
                        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-white
                            bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">All</a>
                        <a href="/#/about" class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">About(temp)</a>
                        <a href="/#/notapage" class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Error404(temp)</a>
                        <a href="/#/secret" class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Secret</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Technology</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Nature</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Politics</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Sports</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Offbeat</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Meta</a>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">... ▼</a>
                    </div>
                    <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-200 hover:bg-primary-light focus:outline-none focus:text-gray-200 focus:bg-gray-700">Show: Sorted by Spiciness</a>
                    
                </div>
            </header>
        `
        return view
    },
    control: async function () { }

}

export default Filtersbar;