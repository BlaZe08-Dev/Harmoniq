/* SLEEP TIMER */

let sleepTimerId = null;

let sleepTimerEndTime = null;

let endAfterCurrentSong = false;

function setSleepTimer(minutes){

    clearSleepTimer();

    sleepTimerEndTime =
        Date.now() + minutes * 60 * 1000;

    sleepTimerId = setTimeout(()=>{

        audio.pause();

        showToast({

            icon:"🌙",

            message:"Sleep Timer Finished"

        });

        clearSleepTimer();

    },minutes * 60 * 1000);

    showToast({

        icon:"🌙",

        message:`Sleep Timer set for ${minutes} minutes`

    });

}

function clearSleepTimer(){

    if(sleepTimerId){

        clearTimeout(sleepTimerId);

    }

    sleepTimerId = null;

    sleepTimerEndTime = null;

    endAfterCurrentSong = false;

}

function setEndAfterCurrentSong(){

    clearSleepTimer();

    endAfterCurrentSong = true;

    showToast({

        icon:"🌙",

        message:"Sleep after current song"

    });

}

window.setEndAfterCurrentSong =
    setEndAfterCurrentSong;
    
window.setSleepTimer =
    setSleepTimer;

window.clearSleepTimer =
    clearSleepTimer;