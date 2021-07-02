let Bottombar = {
    render: async function () {
        let view =  /*html*/`

            <!-- Trending Posts list -->
            <div class="rounded-md w-full my-4 bg-primary-light divide-y divide-gray-600 shadow-md">
                <div class="h-12 pl-4 p-4 text-white ">
                    Trending Posts
                    <!-- <span class="px-4 py-2 text-xl w-48 font-semibold text-white"></span> -->
                </div>
                <div class="h-20 px-4 pt-2 text-white ">
                    <div class="flex">
                        <div>
                            <div
                                class="bg-info-light shadow text-center align-middle rounded mt-1 h-14 w-12 border-2 divide-y ">
                                <p class=" h-8 align-middle text-gray-800">3662</p>
                                <p class="h-6 text-xs text-white text-gray-700"> diggs</p>
                            </div>
                        </div>
                        <div class="pl-2">
                            <p class="text-sm font-semibold">How does the complexity of living structures compare
                                with the complexity of artificial structures?</p>
                            <span class="text-xs text-gray-400"> 2 hours ago</span> .
                            <span class="text-xs text-gray-400"> 200 likes</span> .
                            <span class="text-xs text-gray-400"> 200 comments</span>
                        </div>
                    </div>

                </div>
                <div class="h-20 px-4 pt-2 text-white ">
                    <div class="flex">
                        <div>
                            <div
                                class="bg-info-light shadow text-center align-middle rounded mt-1 h-14 w-12 border-2 divide-y ">
                                <p class=" h-8 align-middle text-gray-800">3662</p>
                                <p class="h-6 text-xs text-white text-gray-700"> diggs</p>
                            </div>
                        </div>
                        <div class="pl-2">
                            <p class="text-sm">How does the complexity of living structures compare with the
                                complexity of artificial structures?</p>
                            <span class="text-xs text-gray-400"> 2 hours ago</span> .
                            <span class="text-xs text-gray-400"> 200 likes</span> .
                            <span class="text-xs text-gray-400"> 200 comments</span>
                        </div>
                    </div>

                </div>
                <div class="h-20 px-4 pt-2 text-white ">
                    <div class="flex">
                        <div>
                            <div
                                class="bg-info-light shadow text-center align-middle rounded mt-1 h-14 w-12 border-2 divide-y ">
                                <p class=" h-8 align-middle text-gray-800">3662</p>
                                <p class="h-6 text-xs text-white text-gray-700"> diggs</p>
                            </div>
                        </div>
                        <div class="pl-2">
                            <p class="text-sm">How does the complexity of living structures compare with the
                                complexity of artificial structures?</p>
                            <span class="text-xs text-gray-400"> 2 hours ago</span> .
                            <span class="text-xs text-gray-400"> 200 likes</span> .
                            <span class="text-xs text-gray-400"> 200 comments</span>
                        </div>
                    </div>

                </div>

                <div class="h-20"></div>
                <div class="h-12"></div>

            </div>

        `
        return view
    },
    control: async function () { }
}

export default Bottombar;