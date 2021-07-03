let workdur;
let theTIME;
let brekdur;
let theme = 'opal'
let running = false;
let docTheme = document.getElementsByTagName('link')[0];

let notPerm = false;
if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }

storage = window.localStorage;
//localstorage has workdur, brekdur, theme
if(localStorage.getItem('workdur_index')===null && localStorage.getItem('breakdur_index')===null){
    workdur = 25;
    brekdur = 5;
} else {
    workdur = localStorage.getItem('workdur');
    brekdur = localStorage.getItem('brekdur');
    
    let workdurInd = localStorage.getItem('workdur_index');
    let brekdurInd = localStorage.getItem('brekdur_index');

    let work = document.querySelector(".work_select");
    let brek = document.querySelector(".break_select");

    brek.getElementsByTagName('option')[brekdurInd].selected = true;
    work.getElementsByTagName('option')[workdurInd].selected = true;
    workdur = work.options[workdurInd].value;
    brekdur = brek.options[brekdurInd].value;
}

if(localStorage.getItem('theme') === null){
    localStorage.setItem('theme', "opal");
} else {
    let curTheme = localStorage.getItem('theme');
    docTheme.setAttribute('href',`styles/${curTheme}.css`);
}

let timer = document.querySelector('.timer h1');

const beforeUnloadListener = (event) => {
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
};

if(workdur >= 60){
    timer.innerText = (workdur % 60 + ":" + (workdur-60) + ":00");
} else {
    timer.innerText = (workdur + ":00");
}

function getDelta(curTime, endTime){
    let delta =  endTime.getTime() - curTime.getTime();

    let hours = Math.floor((delta-1 %(1000 * 60 * 60 *24)) / (1000 * 60 * 60))
    let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((delta % (1000 * 60)) / 1000);
    if(delta <= 0){
        return "TERMINATE"
    }

    minutes = twoZero(minutes);
    seconds = twoZero(seconds);
    if(hours === 0){
        if(minutes === 0){
            if(seconds <= 0){
                console.log("TIMER ENDED SHOULD RETURN TERMINATE")
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

function breakTimer(){
    startTimer(brekdur);
}

function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Timer ended!");
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Timer ended!");
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
let pause = false;
let deltaOut;
function startTimer(dur){
    let durInMin = dur;
    let startTime = new Date();
    let endTime = new Date();
    endTime.setTime(startTime.getTime() + (durInMin * 60 * 1000));
    if(running === false){
        running = true;
            theTIME = setInterval(function run(){
                let curTime = new Date();
                let curSec = curTime.getSeconds();
                curTime.setSeconds(curSec - 2)
                deltaOut = getDelta(curTime, endTime);
                if(deltaOut === "TERMINATE"){
                    //end code
                    console.log('timer ended')
                    updateTimerToSelectedOp();
                    removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
                    if(Notification.permission === "granted"){
                        var notification = new Notification("Timer ended!")
                    }
                    clearInterval(theTIME);
                    return;
                }
                timer.innerText = deltaOut;  
                console.log(deltaOut);   
            },1001);
    } else {
        console.log('cannot run timer is already running')
    }
    
    const beforeUnloadListener = (event) => {
        event.preventDefault();
        return event.returnValue = "Are you sure you want to exit?";
      };
      addEventListener("beforeunload", beforeUnloadListener, {capture: true});
}


function getWorkOption(){
    let work = document.querySelector(".work_select");
    let time = work.options[work.selectedIndex].value;
    console.log("selected time option" +time);
    
    return time;
}

function getWorkIndex(){
    let work = document.querySelector(".work_select");
    let ind = work.options[work.selectedIndex].index;
    console.log("selected work index" +ind);
    console.log("local work index" +localStorage.getItem('workdur_index'));
    return ind;
}

function setWork(selected){
    console.log('setwork')
    selected.selected = true;
    workdur = getWorkOption();
    workind = getWorkIndex();
    localStorage.setItem('workdur', workdur)
    localStorage.setItem('workdur_index',workind)
    console.log("local work option" +localStorage.getItem('workdur'));
}

function getBreakOption(){
    let brek = document.querySelector(".break_select");
    let time = brek.options[brek.selectedIndex].value;
    console.log("local break option" +localStorage.getItem('brekdur'));
    console.log(time);
    return time;
}

function getBrekIndex(){
    let brek = document.querySelector(".break_select");
    let ind = brek.options[brek.selectedIndex].index;
    console.log(localStorage.getItem('brekdur_index'));

    return ind;
}

function setBreak(selected){
    console.log('setbrek')
    selected.selected = true;
    brekdur = getBreakOption()
    brekind = getBrekIndex();
    localStorage.setItem('brekdur', workdur)
    localStorage.setItem('brekdur_index',brekind)
}
let brek = document.querySelector(".break_select");
let work = document.querySelector(".work_select");

function updateTimerToSelected(){
    let selected = document.querySelector('.selected');
    if(selected.value === "work"){
        timer.textContent = work.options[work.selectedIndex].value + ":00";
    } else {
        timer.textContent = brek.options[brek.selectedIndex].value + ":00";
    }
}

function updateTimerToSelectedOp(){
    let selected = document.querySelector('.selected');
    if(selected.value === "work"){
        timer.textContent = brek.options[brek.selectedIndex].value + ":00";
    } else {
        timer.textContent = work.options[work.selectedIndex].value + ":00";
    }
}

function restartTimer(){
    
    pause = true;
    console.log('pause is ' + pause)
    clearInterval(theTIME);

    updateTimerToSelected();
    running = false;
}
const restartButton = document.querySelector('.restart_timer');
restartButton.addEventListener('click', ()=>{
    restartTimer();
})

const set = document.querySelector(".Go");
set.addEventListener('click', ()=>{
    setWork(getWorkOption());
    setBreak(getBreakOption());
    updateTimerToSelected();
});


const startButton = document.querySelector('.start_timer');
startButton.addEventListener('click', ()=>{
    if(running === false){
        let mode = document.querySelector('.selected');
        if(mode.value=== "work"){
            workTimer();
        } else if(mode.value === "break"){
            breakTimer();
        }
        running = true;
    }
})



const themeButtons = document.querySelectorAll('.theme-button');

if (docTheme.getAttribute("href") == "styles/styles.css"){
    console.log('empty theme')
    docTheme.setAttribute('href','styles/opal.css')
}
themeButtons.forEach((themeButton)=>{
    themeButton.addEventListener('click',()=>{
        newTheme = themeButton.value;
        localStorage.setItem('theme', newTheme);
        console.log("new theme is" + newTheme)
        // Change the value of href attribute 
        // to change the css sheet.
        docTheme.setAttribute('href',`styles/${newTheme}.css`);
    })
})



// work & rest button selection
workButton = document.querySelector('.work_grind');
breakButton = document.querySelector('.break_time');

workButton.addEventListener('click', ()=>{
    workButton.classList.add('selected');
    breakButton.classList.remove('selected')
    clearInterval(theTIME);
    timer.textContent = work.options[work.selectedIndex].value + ":00";
})

breakButton.addEventListener('click', ()=>{
    breakButton.classList.add('selected');
    workButton.classList.remove('selected')
    clearInterval(theTIME);
    timer.textContent = brek.options[brek.selectedIndex].value + ":00";
})

