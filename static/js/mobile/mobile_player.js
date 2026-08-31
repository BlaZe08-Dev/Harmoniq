/* HARMONIQ MOBILE PLAYER STATES */

const expandedPlayer =
    document.getElementById("mobileExpandedPlayer");

const compactPlayer =
    document.getElementById("mobileCompactPlayer");

/* THUMBNAILS */

const expandedDisc =
    document.getElementById("mobilePlayerThumbnail");

const compactDisc =
    document.getElementById("compactThumbnail");


/* EXPANDED → COMPACT */

if (expandedDisc) {

    expandedDisc.addEventListener("click", (e) => {

        e.stopPropagation();

        if (expandedPlayer) {

            expandedPlayer.classList.add(
                "hidden-player"
            );
        }

        if (compactPlayer) {

            compactPlayer.classList.remove(
                "hidden-player"
            );
        }
    });
}


/* COMPACT → EXPANDED */

if (compactDisc) {

    compactDisc.addEventListener("click", (e) => {

        e.stopPropagation();

        if (compactPlayer) {

            compactPlayer.classList.add(
                "hidden-player"
            );
        }

        if (expandedPlayer) {

            expandedPlayer.classList.remove(
                "hidden-player"
            );
        }
    });
}

/* REACTIVE NEXT BUTTON */

const mobilePlayBtn =
    document.getElementById("mobilePlayBtn");

const compactPlayBtn =
    document.getElementById("compactPlayBtn");

const mobileNextWrapper =
    document.querySelector(".next-btn-wrapper");


function updateMobilePlayerState(){

    if(!audio) return;

    const isPaused = audio.paused;

    /* PLAY / PAUSE ICONS */

    if(mobilePlayBtn){

        mobilePlayBtn.innerText =
            isPaused ? "►" : "❚❚";
    }

    if(compactPlayBtn){

        compactPlayBtn.innerText =
            isPaused ? "►" : "❚❚";
    }

    /* NEXT BUTTON REACTION */

    if(mobileNextWrapper){

        if(isPaused){

            mobileNextWrapper.classList.add(
                "next-hidden"
            );

        }else{

            mobileNextWrapper.classList.remove(
                "next-hidden"
            );
        }
    }
}


/* AUDIO EVENTS */

if(audio){

    audio.addEventListener(
        "play",
        updateMobilePlayerState
    );

    audio.addEventListener(
        "pause",
        updateMobilePlayerState
    );
}

/* MOBILE WAVE PROGRESS */

const mobileWaveFill =
    document.querySelector(".wave-progress-fill");


function updateWaveProgress(){

    if(!audio || !mobileWaveFill) return;

    if(!audio.duration) return;

    const progress =

        (audio.currentTime / audio.duration) * 100;

    mobileWaveFill.style.width =
        progress + "%";
}


/* AUDIO TIME UPDATE */

if(audio){

    audio.addEventListener(
        "timeupdate",
        updateWaveProgress
    );
}

/* MOBILE → FULLSCREEN OPEN */

const fullscreenPlayer =
    document.getElementById("fullscreenPlayer");


/* EXPANDED PLAYER OPEN */

if(expandedPlayer){

    expandedPlayer.addEventListener("click", (e)=>{

        /* IGNORE CONTROL BUTTONS */

        if(
            e.target.closest("button")
        ) return;

        if(fullscreenPlayer){

            fullscreenPlayer.classList.remove(
                "hidden"
            );
        }
    });
}


/* COMPACT PLAYER OPEN */

if(compactPlayer){

    compactPlayer.addEventListener("click", (e)=>{

        /* IGNORE PLAY BUTTON */

        if(
            e.target.closest("button")
        ) return;

        if(fullscreenPlayer){

            fullscreenPlayer.classList.remove(
                "hidden"
            );
        }
    });
}