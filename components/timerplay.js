const {PlaylistAddCheck} = require("@material-ui/icons");
const {TimerPlayer} = require("@Component/timerplay");

class PlayTrack extends React.Component{
    constructor(props){
        this.track = track;
        this.bar_number = 0;

        let ctx, worker;
        this.state={
            bar_number
        }

        
    }
 init(){
    var worker = new Worker("/timer.js");
    worker.onload
    worker.onmessage({data}){
        var nextUp = [];
        var bar = data.bar || 0;
        switch(data){
            case 'load':
                worker.postMessage("")
                worker.postMessage("start");
            case 'FULLTICK':
                track[bar].forEach( bar=>{
                    playNote(barNumber, bar, [0.25, 0.5, 0, 0]);

                });
                break;
            case 'tick': 
                halfTime(barNumber, bar, [0.2, 1.8, 0.6]);
                tick();
            case 'andthree':
                barNumber = 4;
            case 'two':
                barNumber = 2;
            case 'one':
                this.setState('rx1', data)
            
            }

        }
        setTimer(function(){})
    }
    render(props,state){
        return render (<h3>{data1}</h>);

    }
    
}

function startTimer() {
  var ctx = window.audioCtx || new AudioContext();
  var worker = new Worker("/timer.js");
  worker.onmessage = function (e) {
    if ((e.data = "tick")) {
    }
  };
}

function start
