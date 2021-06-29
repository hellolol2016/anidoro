let durInMin = 10;




function getDelta(curTime, endTime){
    let delta =  endTime.getTime() - curTime.getTime();

    let hours = Math.floor((delta %(1000 * 60 * 60 *24)) / (1000 * 60 * 60))
    let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((delta % (1000 * 60)) / 1000);
    return(hours + "h" + minutes + "m" + seconds+"s");
}


function startTimer(){
    let startTime = new Date();
    let endTime = new Date();
    endTime.setTime(startTime.getTime() + (durInMin * 60 * 1000));

    setInterval(function run(){
        let curTime = new Date();
        let curSec = curTime.getSeconds();
        curTime.setSeconds(curSec - 2)
        console.log(getDelta(curTime, endTime))
    },1001);
    

}

// function startTimer (startTime){
//     // let cur = new Date();
//     // console.log(cur);
    
    
//     console.log(newTime)
    


//     console.log(hours + "h" + minutes + "m" + seconds+"s");
// }