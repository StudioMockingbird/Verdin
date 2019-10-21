
let report_post = async (type, item_id, reason, details) => {
    let targetURL =''
    let payload = {
        "reason"    : reason,
        "details"   : details,
    }

    if (type == 'post') {
        targetURL = `http://localhost:3000/report_post`
        payload.post_id = item_id
    } else if (type == 'comment') {
        targetURL = `http://localhost:3000/report_comment`
        payload.comment_id = item_id
    } else {
        console.log('Could not get type of report')
    }
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(targetURL, options)
        console.log(response)
        const json = await response.json();
        json.responseCode = response.status
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Report = {
    state : {},
    load: async function () {},
    render: async function (type, user_nick, content, id) {
        let view =  /*html*/`                
            <div class="modal is-active" id="report_modal">
                <div class="modal-background" id="report_modal_bg"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">
                        Report
                        <span id="report_content_type">${type}</span> 
                        made by 
                        <span id="report_content_user">${user_nick}</span>
                    </p>
                    </header>
                    <section class="modal-card-body">
                        <code>
                            ${  
                                // if content is greater than 150 chars long, truncate it and append "..."
                                content.length > 150 
                                ?
                                (content).slice(0,150) + '...'
                                :
                                content
                            }
                        </code>
                        
                        <br>
                        <br>

                        <div class="field">
                            <label class="label">Please state a reason.</label>
                            <div class="select">
                                <select id="report_content_reason_input">
                                    <option>Select dropdown</option>
                                    <option>With options</option>
                                </select>
                            </div>
                        </div>
                        <br>

                        <div class="field">
                            <label class="label">Please add more details to the help the mods</label>
                            <textarea class="textarea" id="report_content_details_input" placeholder="Enter the Content of your Post" ></textarea>
                            <p class="help is-danger">This email is invalid</p>
                        </div>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" id="report_submit_btn" data-submit-report-for-${type}="${id}">
                            Save changes
                        </button>
                        <button class="button" id="report_cancel_btn">Cancel</button>
                    </footer>
                </div>
            </div>
        `
        return view
    },
    control: async function () {
        
        // register the flash component
        let flash = document.getElementById('error_flash')

        document.getElementById("report_modal_bg").addEventListener('click', async (e) => {
            console.log("Report bg clicked for")
            document.getElementById('report_modal').classList.toggle('is-active')
        })

        document.getElementById("report_submit_btn").addEventListener('click', async (e) => {
            
            if (e.target.getAttribute('data-submit-report-for-post')) {
                console.log("Report submit clicked for Post: ", e.target.getAttribute('data-submit-report-for-post'))
                let post_id     = e.target.getAttribute('data-submit-report-for-post')
                let reason      = document.getElementById("report_content_reason_input").value;
                let details     = document.getElementById("report_content_details_input").value;
                console.log(reason, details)
                if (reason =='Select dropdown' || details == '') {
                    alert (`The report cannot be empty`)
                } else {
                    let result = await report_post("post", post_id, reason, details)
                    if (result.status == "success") {
    
                        console.log(result)
                        // alert("DINGUS")
                        // TODO - if user has a back histroy, do window.history.back()
                        // window.location.hash = `/p/${result.data.unqid}`
                    } else {
                        console.log(`Update Failed: ${result.errorMessage}`)
                        flash.classList.toggle('is-hidden')
                        flash.innerText = `${result.message}`
                        flash.scrollIntoView({behavior: 'smooth'})
                    }
    
                } 
            } else if (e.target.getAttribute('data-submit-report-for-comment')) {
                console.log("Report submit clicked for Comment: ", e.target.getAttribute('data-submit-report-for-comment'))
                let comment_id     = e.target.getAttribute('data-submit-report-for-comment')
                let reason      = document.getElementById("report_content_reason_input").value;
                let details     = document.getElementById("report_content_details_input").value;
                console.log(reason, details)
                if (reason =='Select dropdown' || details == '') {
                    alert (`The report cannot be empty`)
                } else {
                    let result = await report_post("comment", comment_id, reason, details)
                    if (result.status == "success") {
    
                        console.log(result)
                        // alert("DINGUS")
                        // TODO - if user has a back histroy, do window.history.back()
                        // window.location.hash = `/p/${result.data.unqid}`
                    } else {
                        console.log(`Update Failed: ${result.errorMessage}`)
                        flash.classList.toggle('is-hidden')
                        flash.innerText = `${result.message}`
                        flash.scrollIntoView({behavior: 'smooth'})
                    }
    
                } 
            }
            document.getElementById('report_modal').classList.toggle('is-active')
        })

        document.getElementById("report_cancel_btn").addEventListener('click', async (e) => {
            console.log("Report cancel clicked for")
            document.getElementById('report_modal').classList.toggle('is-active')
        })
    }
}

export default Report;