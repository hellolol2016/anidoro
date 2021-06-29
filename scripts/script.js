

let workdur = 1;
let brekdur = 5;

function getDelta(curTime, endTime){
    let delta =  endTime.getTime() - curTime.getTime();

    let hours = Math.floor((delta %(1000 * 60 * 60 *24)) / (1000 * 60 * 60))
    let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((delta % (1000 * 60)) / 1000);
    if(delta = 0){
        
    }
    if(hours === 0){
        if(minutes === 0){
            if(seconds === 0){
                return "TERMINATE"
            }
            return(seconds+"s");
        }
        return(minutes + "m" + seconds+"s");
    }
    return(hours + "h" + minutes + "m" + seconds+"s");
}


function workTimer(){
    startTimer(workdur);
}

let timer = document.querySelector('.timer h1');
function startTimer(dur){
    let durInMin = dur;
    let startTime = new Date();
    let endTime = new Date();
    endTime.setTime(startTime.getTime() + (durInMin * 60 * 1000));

    
    setInterval(function run(){
        let curTime = new Date();
        let curSec = curTime.getSeconds();
        curTime.setSeconds(curSec - 2)
        let deltaOut = getDelta(curTime, endTime);
        if(deltaOut === "TERMINATE"){
            //end code
            
        }
        timer.innerText = deltaOut;
        console.log(deltaOut);
    },1001);
    
}


function getWorkOption(){
    let work = document.querySelector(".work-select");
    let time = work.options[work.selectedIndex].value;
    console.log(time);
    return time;
}

function setWork(selected){
    console.log('setwork')
    selected.selected = true;
    workdur = getWorkOption()
}

function getBreakOption(){
    let brek = document.querySelector(".break-select");
    let time = brek.options[brek.selectedIndex].value;
    console.log(time);
    return time;
}
function setBreak(selected){
    console.log('setbrek')
    selected.selected = true;
    brekdur = getBreakOption()
}

const go = document.querySelector(".Go");
go.addEventListener('click', ()=>{
    setWork(getWorkOption());
    setBreak(getBreakOption());
});
