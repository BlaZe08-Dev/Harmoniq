const fsPlayer = document.getElementById("fullscreenPlayer");
const fsBg = document.getElementById("fsBg");

const expandBtn = document.getElementById("expandBtn");
const expandPath = document.getElementById("expandPath");

const fsPlayBtn = document.getElementById("fsPlayBtn");
const fsPrevBtn = document.getElementById("fsPrevBtn");
const fsNextBtn = document.getElementById("fsNextBtn");
const fsEqBtn = document.getElementById("fsEqBtn");
const fsSleepBtn = document.getElementById("fsSleepBtn");
const fsRepeatBtn = document.getElementById("fsRepeatBtn");
const fsShuffleBtn = document.getElementById("fsShuffleBtn");
const fsFavoriteBtn = document.getElementById("fsFavoriteBtn");
const fsMoreBtn = document.getElementById("fsMoreBtn");

/* DRAG TO CLOSE */

let isDraggingFS = false;

let dragStartY = 0;

let dragDistance = 0;

let hasStartedDragging = false;

function initializeFullscreenIcons(){

    if(fsPlayBtn)
        fsPlayBtn.innerHTML = audio.paused ? Icons.play : Icons.pause;

    if(fsPrevBtn)
        fsPrevBtn.innerHTML = Icons.previous;

    if(fsNextBtn)
        fsNextBtn.innerHTML = Icons.next;

    if(fsEqBtn)
        fsEqBtn.innerHTML = Icons.equalizer;

    if(fsSleepBtn)
        fsSleepBtn.innerHTML = Icons.timer;

    if(fsRepeatBtn)
        fsRepeatBtn.innerHTML = Icons.repeat;

    if(fsShuffleBtn)
        fsShuffleBtn.innerHTML = Icons.shuffle;

    if(fsFavoriteBtn)
        fsFavoriteBtn.innerHTML = Icons.heart;

    if(fsMoreBtn)
        fsMoreBtn.innerHTML = Icons.more;
}

initializeFullscreenIcons();

if(fsFavoriteBtn){

    fsFavoriteBtn.addEventListener(
        "click",
        toggleCurrentSongFavorite
    );

}

if(fsSleepBtn){

    fsSleepBtn.addEventListener(
        "click",
        openSleepTimerSheet
    );

}

if(fsRepeatBtn){
    fsRepeatBtn.addEventListener(
        "click",
        toggleRepeatMode
    );

}

function closeFullscreen(){
    
    hasStartedDragging = false;
    
    isDraggingFS = false;
    
    dragDistance = 0;

    fsPlayer.style.transition = "";
    fsPlayer.style.transform = "";

    fsPlayer.classList.add("hidden");

    if(expandPath){

        expandPath.setAttribute(
            "d",
            "M3 3h6v2H5v4H3V3zm16 0v6h-2V5h-4V3h6zM3 15h2v4h4v2H3v-6zm16 0h2v6h-6v-2h4v-4z"
        );

    }

}

function openFullscreen(){

    fsPlayer.classList.remove("hidden");

    fsPlayer.style.transform = "";

    if(expandPath){

        expandPath.setAttribute(
            "d",
            "M9 9H3v2h4v4h2V9zm12 0h-6v6h2v-4h4V9zM9 15H3v2h6v-6H7v4zm12 2v-2h-4v-4h-2v6h6z"
        );

    }

    if(fsPlayBtn){

        fsPlayBtn.innerHTML = audio.paused
            ? Icons.play
            : Icons.pause;

    }

}

// FULLSCREEN PLAYER

if (expandBtn && fsPlayer) {

    expandBtn.onclick = () => {

        if (fsPlayer.classList.contains("hidden")) {
            openFullscreen();

        } else {
            closeFullscreen();
        }

    };
}
audio.addEventListener("play",()=>{

    if(fsPlayBtn){
        fsPlayBtn.innerHTML = Icons.pause;
    }

});


audio.addEventListener("pause",()=>{

    if(fsPlayBtn){
        fsPlayBtn.innerHTML = Icons.play;}

});

// FULLSCREEN SEEK
const fsProgress = document.getElementById("fsProgress");

if (fsProgress) {

    fsProgress.addEventListener("input", (e) => {

        audio.currentTime = (e.target.value / 100) * audio.duration;
    });
}

fsPlayer.addEventListener(
    "touchstart",
    startTouchDrag,
    { passive: false }
);

window.addEventListener(
    "touchmove",
    dragTouch,
    { passive: false }
);

window.addEventListener(
    "touchend",
    endTouchDrag
);

function startTouchDrag(e){

    if (e.target.closest("button")) return;

    dragStartY = e.touches[0].clientY;

    dragDistance = 0;

    hasStartedDragging = false;

    fsPlayer.style.transition = "none";
}

function dragTouch(e){

    if(!e.touches.length) return;
    
    dragDistance = e.touches[0].clientY - dragStartY;

    if(dragDistance < 0){
        dragDistance = 0;
    }

    if(!hasStartedDragging){

        if(dragDistance < 10){
            return;
        }

        hasStartedDragging = true;

        isDraggingFS = true;
    }

    e.preventDefault();

    fsPlayer.style.transform =
        `translateY(${dragDistance}px)`;
}

function endTouchDrag(){

    // It was just a tap, not a drag
    if(!hasStartedDragging){
        return;
    }

    isDraggingFS = false;

    hasStartedDragging = false;

    fsPlayer.style.transition = "transform .25s ease";

    if(dragDistance > 120){

        closeFullscreen();

    }else{

        fsPlayer.style.transform = "translateY(0px)";

    }

    dragDistance = 0;

    setTimeout(()=>{

        fsPlayer.style.transition = "";

    },250);

}

function toggleCurrentSongFavorite(){

    const song = queue[currentIndex];

    if(!song) return;

    const wasFavorite = isFavorite(song);

    toggleFavorite(song);

    if(wasFavorite){

        fsFavoriteBtn.innerHTML = Icons.heart;

        showToast({

            icon:"💔",

            message: `${song.title} removed from Favorites`

        });

    }else{

        fsFavoriteBtn.innerHTML = Icons.heartFilled;

        showToast({

            icon:"❤️",

            message: `${song.title} added to Favorites`

        });

    }

}

// Sleep Timer
function openSleepTimerSheet(){

    const content = document.createElement("div");

    const options = [

        { label: "15 Minutes", minutes: 15 },

        { label: "30 Minutes", minutes: 30 },

        { label: "45 Minutes", minutes: 45 },

        { label: "1 Hour", minutes: 60 },

        { label: "End of Current Song", endSong: true },

        { label: "Cancel Timer", cancel: true }

    ];

    options.forEach(option => {

        const item = document.createElement("div");

        item.className = "sheet-option";

        if(option.cancel){

            item.classList.add("cancel");

        }

        item.textContent = option.label;

        item.addEventListener("click", () => {

            if(option.minutes){

                setSleepTimer(option.minutes);

            }
            else if(option.endSong){

                setEndAfterCurrentSong();
                
            }
            else if(option.cancel){

                clearSleepTimer();

                showToast({

                    icon:"🌙",

                    message:"Sleep Timer Cancelled"

                });

            }

            closeBottomSheet();

        });

        content.appendChild(item);

    });

    openBottomSheet({

        title: "Sleep Timer",

        content

    });

}

function toggleRepeatMode(){

    switch(repeatMode){

        case RepeatMode.OFF:

            repeatMode = RepeatMode.ALL;

            fsRepeatBtn.innerHTML = Icons.repeat;

            fsRepeatBtn.classList.add("player-mode-active");

            break;

        case RepeatMode.ALL:

            repeatMode = RepeatMode.ONE;

            fsRepeatBtn.innerHTML = Icons.repeatOne;

            fsRepeatBtn.classList.add("player-mode-active");

            break;

        case RepeatMode.ONE:

            repeatMode = RepeatMode.OFF;

            fsRepeatBtn.innerHTML = Icons.repeat;

            fsRepeatBtn.classList.remove("player-mode-active");

            break;

    }

}