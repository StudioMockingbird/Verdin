let Card = {
    // Only add shareable state here so that any other component can query the current value of state
    state : {},
    load: async function () {},
    render: async function (post) {
        // console.log(post)
        let view =  /*html*/`                
            <div class="h-48 mt-2 ml-2 border border-gray-400 static rounded shadow">
                <img class="absolute w-1/5 h-48 rounded-l"
                    style="clip-path: polygon(0 0, 80% 0%, 98% 100%, 0% 100%); " src="https://picsum.photos/400/400"
                    alt="avatar">

                <div
                    class="absolute bg-primary-light text-center align-middle rounded h-6 w-20 -mx-2 my-8 border-2 divide-y ">
                    <p class="text-xs text-white"> Trending</p>
                </div>

                <div
                    class="absolute bg-yellow-400 text-center align-middle rounded h-16 w-20 -mx-2 my-16 border-2 border-white divide-y divide-white">
                    <p class="text-2xl font-extrabold text-gray-800 text-opacity-100">3662</p>
                    <p class="text-xs text-gray-800"> diggs</p>
                </div>

                <div class="h-32 border-b-2 flex">
                    <div class="w-1/3 dbg" style="shape-outside: polygon(0 0, 80% 0%, 98% 100%, 0% 100%)"></div>
                    <div class="flex w-2/3 justify-between dbg">
                        <div>
                            <div class="h-48 w-48 float-left"
                                style="shape-outside: polygon(0 0, 70% 0%, 98% 100%, 0% 100%)"></div>

                            <div class ="h-1/5">
                                <p> CrSFML provides a simple HTTP client class which you can use to communicate
                                    with HTTP servers.</p>
                            </div>
                            <div>
                                <p>This is just a dummy text to see if tilting the image works well. will have
                                    to do
                                    the entire content part of the card from scratch. Also we can put a div on
                                    the
                                    image (also put the image in the div) with opacity high and on hover remove
                                    opacity for the "clearing" effct on hover </p>
                            </div>
                            <div>
                                by Rishv Sharan, 3 hours ago
                            </div>
                        </div>>
                    </div>
                </div>
                <div class="h-16 bg-background-dark border border-b-2 flex">
                    <div class="w-1/3"></div>
                    <div class="flex w-2/3 justify-between">
                        <div class="bg-grey-lighter flex items-center justify-between text-gray-700 font-bold">
                            <!-- <span class="text-xs text-gray-600"><i class="text-xl las la-history"></i>2 hours ago</span> &nbsp . &nbsp -->
                            <span class="text-xs text-gray-600"> <i class="text-xl lar la-heart"></i> 200
                                likes</span> &nbsp . &nbsp
                            <span class="text-xs text-gray-600"> <i class="text-xl las la-comments"></i> 200
                                comments</span> &nbsp . &nbsp
                            <span class="text-xs text-gray-600"> <i class="text-xl las la-eye"></i> 200 views</span>
                        </div>
                        <div class="bg-grey-lighter flex items-center justify-between text-gray-700 font-bold mr-4">
                            Goto Comments &nbsp <span class="text-2xl"> »</span>
                        </div>
                    </div>

                </div>
            </div>
        `
        return view
    },
    control: async function () {
        // Handle controls for the post
        // document.getElementById("post_like_btn").addEventListener('click', async (e) => {
        //     console.log("Like was clicked")
        //     let result = await likePost(Utils.parseRequestURL().id)
        //     console.log(result)
        // })
        // document.getElementById("post_reply_toggle_btn").addEventListener('click', async (e) => {
        //         // ensure user is logged in to use this action
        //         // utils.redirect_to_login_if_not_loggedin()

        //     let component = document.getElementById('post_comment_field')
        //     component.classList.toggle('is-hidden')
        //     // this bit is mainly for a smoother transition. Broken in chrome
        //     document.getElementById('post_reply_txt').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        //     document.getElementById('post_reply_txt').focus();
        // })
        // document.getElementById("post_edit_btn").addEventListener('click', async (e) => {
        //     console.log("Edit was clicked")
        // })
        // document.getElementById("post_delete_btn").addEventListener('click', async (e) => {
        //     console.log("Delete was clicked")
        // })
        
        // document.getElementById("post_reply_submit").addEventListener("click", async (e) => {
        //     let post_reply_text = document.getElementById("post_reply_txt").value
        //     let result = await saveComment(Utils.parseRequestURL().id, '', post_reply_text)
        //     console.log(result)

        // })

    }
}

export default Card;

