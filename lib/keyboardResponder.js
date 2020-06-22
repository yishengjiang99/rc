import _console from "./_console";
import envelope from "./envelope";
const keys = ["z", "a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j"];

class KeyboardResponder extends HTMLElement{
    keyCode: Number,

    eventsQueue: [],

    eventsDone: []

    constructor(props){
        super(props);
        this={
            width:720, height:480,
            loopSeconds: 8,
            ...props
        }
        this.ctx = props.ctx || window.ctx || new AudioContext();
        this.envelopes = {}
        const shadowRoot = this.attachShadow({mode: 'open'});

        this.output = window.postMessage;
        this.t0 =null;
        this.shadowRoot.innerHTML=`<div><canvas></canvas</div>`;

        this.canvas = document.createElement("canvas", {width:720, height:480});
        this.shadowRoot.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d');
    }
    connectedCallback(){
        let self = this;
        window.onkeydown=(e)=>{
            const signal = 
            self.t0 = self.t0 || e.timestamp;
            const start = e.timestamp-self.t0;
            eventQueue.push({
                 : start,
                status: "attacking"
            })
            // const env = self.envelopes[e.keycode] || {
            //     start: start,
            //     status: "attacking"
            // }
            requestAnimationFrame(draw)
        }
        window.onkeyup=(e)=>{
            self.envelopes[e.keycode] = self.envelopes[e.keycode] || {
                release:  e.timestamp-self.t0,
                status: "releasing"
            }
            requestAnimationFrame(draw)

        }
        window.onkeypress=(e)=>{
            self.envelopes[e.keycode] = self.envelopes[e.keycode] || {
                pressing:  e.timestamp-self.t0,
                status: "pressing"
            }
            requestAnimationFrame(draw)

        }
        window.addEventListener('resize', resizeCanvas, false);
        // Draw canvas border for the first time.
        resizeCanvas();


    }
    resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw();
    }

    draw(){
        
        const ctx = this.canvas.getContext("2d");

    }
    
}

customElements.define("keyboard-viz", KeyboardResponder)