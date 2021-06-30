let workdur;
let brekdur;
storage = window.localStorage;
//localstorage has workdur, brekdur, theme
if(localStorage.getItem('workdur')===null){
    workdur = 25;
    brekdur = 5;
} else {
    workdur = localStorage.getItem('workdur');
    brekdur = localStorage.getItem('brekdur');
}

let timer = document.querySelector('.timer h1');

if(workdur > 60){
    timer.innerText = (workdur % 60 + ":" + (workdur-60) + ":00");
} else {
    timer.innerText = (workdur + ":00");
}

function getDelta(curTime, endTime){
    let delta =  endTime.getTime() - curTime.getTime();

    let hours = Math.floor((delta-1 %(1000 * 60 * 60 *24)) / (1000 * 60 * 60))
    let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((delta % (1000 * 60)) / 1000);
    if(delta = 0){
        
    }

    minutes = twoZero(minutes);
    seconds = twoZero(seconds);
    if(hours === 0){
        if(minutes === 0){
            if(seconds === 0){
                return "TERMINATE"
            }
            return(seconds+"s");
        }
        return(minutes + ":" + seconds);
    }
    return(hours + ":" + minutes + ":" + seconds);
}

function twoZero(n){
    return n > 9 ? "" + n: "0" + n;
}

function workTimer(){
    startTimer(workdur);
}


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
    localStorage.setItem('workdur', workdur)
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
    localStorage.setItem('workdur', workdur)
}

const go = document.querySelector(".Go");
go.addEventListener('click', ()=>{
    setWork(getWorkOption());
    setBreak(getBreakOption());
});



// work & rest button selection
workButton = document.querySelector('.work_grind');
breakButton = document.querySelector('.break_time');

workButton.addEventListener('click', ()=>{
    workButton.classList.add('selected');
    breakButton.classList.remove('selected')
})

breakButton.addEventListener('click', ()=>{
    breakButton.classList.add('selected');
    workButton.classList.remove('selected')
})

