let Progressbar = {
    render: async function () {
        let view =  /*html*/`
                <!-- We cannot mount this component as the trasitions only work at start if the HTML is not a JS snippet -->
        `
        return view
    },
    control: async function () { 
        // reset the progress bar to 0 when trasition is over
        document.getElementById('progressbar').addEventListener("transitionend", this.animateReset);  
    },

    animateStart: async function () {
        const pBar = document.getElementById('progressbar');
        pBar.style.transition='width 1.5s'; 
        pBar.style.visibility = 'visible';
        pBar.style.width = '66%';
    },
    animateEnd: async function () {
        const pBar = document.getElementById('progressbar');
        pBar.style.transition='width 0.3s'; 
        pBar.style.visibility = 'visible';
        pBar.style.width = '100%';
    },
    animateReset: async function () {
        const pBar = document.getElementById('progressbar');
        if (pBar.style.width == '100%') {
            pBar.style.visibility = "hidden";
            pBar.style.width = '0%';
        }
    },
}

export default Progressbar;