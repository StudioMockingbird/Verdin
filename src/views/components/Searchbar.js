let Searchbar = {
    render: async function () {
        let view =  /*html*/`
             <nav id="searchbar_component" class="bg-primary-light">
                <div class="mx-16 flex items-center justify-between h-16">

                    <!-- Logo -->
                    <a href="#"> 
                        <img class="h-10" src="/pub/logo.png" alt="Site logo" />
                    </a>
                    <!-- Search textbox -->
                    <form action="/search" class="w-1/2 relative">
                        <input type="search" placeholder="&nbsp &nbsp Press Ctrl + / to focus here."
                            class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light">
                        <button type="submit"
                            class="bg-primary-light text-white rounded font-lg absolute top-0 right-0 bottom-0 mt-1 mr-1 mb-1 px-4 font-semibold hover:bg-primary-light focus:outline-none focus:shadow-outline">
                            Search
                        </button>
                    </form>

                    <div id="profile_header_container" class="hidden flex">

                        <!-- This example requires Tailwind CSS v2.0+ -->
                        <div class="relative mr-4">
                                <button id="notifications_header_btn" class="h-12 px-4 rounded-md hover:bg-secondary-light focus:outline-none focus:bg-secondary-light" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-300" viewBox="0 0 20 20" fill="none"  stroke="currentColor">
                                        <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            <!--
                                Dropdown menu, show/hide based on menu state.

                                Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"
                            -->
                            <div id="notifications_header_dropdown" class="hidden origin-top-right absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Under Development</a>
                                </div>
                            </div>
                        </div>
                        <!-- 
                        <a href="#" class="static right-0 px-4 py-1 mr-4 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light focus:outline-none focus:text-white focus:bg-gray-700 ">                         
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-300 pt-2" viewBox="0 0 20 20" fill="none"  stroke="currentColor">
                            <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                            <ul class="space-y-3 dark:text-white">
                                <li class="font-medium">
                                <a href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                    <div class="mr-3">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    No Messages
                                </a>
                                </li>
                            </ul>
                        </div> -->
                        <div class="relative">
                            <button id="profile_header_btn"
                                class="px-1 py-1 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light focus:outline-none focus:bg-secondary-light">
                                    <img class="w-10 h-10 inline border border-gray-600 rounded-md" src="pub/avatar.jpg" />
                                    <span class="px-2"> Hi ${window.localStorage['nick']}</span>

                            </button>
                            <div id="profile_header_dropdown" class="hidden origin-top-right absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Account
                                    </a>
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        <span>Settings</span>
                                    </a>
                                    <a href="#/logout" class="text-gray-700 block px-4 py-2 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="login_header_container">
                        <!-- Login button -->
                        <a href="/#/u/me/signin"
                            class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light">
                            Login
                        </a> &nbsp

                        <!-- Signup Button -->
                        <a href="/#/u/me/signup"
                            class="text-white rounded font-lg px-6 py-2 font-semibold bg-pink-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </a>
                    </div>
                </div>

            </nav>

        `
        return view
    },
    control: async function () {
        notifications_header_btn.addEventListener("click", async () => {
            document.getElementById('notifications_header_dropdown').classList.toggle('hidden')
        });
        profile_header_btn.addEventListener("click", async () => {
            document.getElementById('profile_header_dropdown').classList.toggle('hidden')
        });

        const updateSearchBarOnLogin = () => {
            if (localStorage.getItem('email') !== null) {
                console.log(`User Logged in. Setting Header for profile`);
                document.getElementById('login_header_container').classList.add('hidden');
                document.getElementById('profile_header_container').classList.remove('hidden');
            } else {
                console.log(`User not logged in. Setting Header for login`);
                document.getElementById('profile_header_container').classList.add('hidden');
                document.getElementById('login_header_container').classList.remove('hidden');
            }

        }

        // Listen on localStorage changes
        // When local storage changes, check if user is logged in and
        // update the searchbar accordingly
        window.addEventListener('storage', updateSearchBarOnLogin());
    }

}

export default Searchbar;