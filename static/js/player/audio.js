const audio = document.getElementById("audioPlayer");

let currentSong = null;
    
    /* PLAYER */
function playAudio(song) {
    
    /* AUDIO ENGINE */
    currentSong = song;
    audio.src = song.audio;
    console.log("Audio URL:", song.audio);
    audio.muted = false;
    audio.volume = 1;
    audio.play();
    
    /* MOBILE PLAYER SYNC */

    if (window.innerWidth <= 768) {

        const expandedPlayer =
            document.getElementById("mobileExpandedPlayer");

        const compactPlayer =
            document.getElementById("mobileCompactPlayer");

        const mobileThumb =
            document.getElementById("mobilePlayerThumbnail");

        const compactThumb =
            document.getElementById("compactThumbnail");

        const mobileTitle =
            document.getElementById("mobileNowPlaying");

        const mobileArtist =
            document.getElementById("mobileArtistName");

        const mobilePlayBtn =
            document.getElementById("mobilePlayBtn");

        const compactPlayBtn =
            document.getElementById("compactPlayBtn");

        /* SHOW EXPANDED PLAYER */
        
        if (expandedPlayer) {

            expandedPlayer.classList.remove("hidden-player");
        }

        /* HIDE COMPACT PLAYER INITIALLY */
        
        if (compactPlayer) {

            compactPlayer.classList.add("hidden-player");
        }

        /* SYNC THUMBNAILS */
        
        if (mobileThumb) {

            mobileThumb.src = song?.thumbnail;
        }

        if (compactThumb) {

            compactThumb.src = song?.thumbnail;
        }

        /* SYNC TEXT */
        
        if (mobileTitle) {

            mobileTitle.innerText = song?.title;
        }

        if (mobileArtist) {

            mobileArtist.innerText = song?.artist;
        }

        /* PLAY BUTTONS */
        
        if (mobilePlayBtn) {

            mobilePlayBtn.innerText = "❚❚";
        }

        if (compactPlayBtn) {

            compactPlayBtn.innerText = "❚❚";
        }

        /* START DISC ROTATION */
        
        if (mobileThumb) {

            mobileThumb.style.animationPlayState =
                "running";
        }

        if (compactThumb) {

            compactThumb.style.animationPlayState =
                "running";
        }
    }

    /* AMBIENT EFFECTS */

    const ambient = document.getElementById("musicAmbient");

    ambient.classList.add("active");

    ambient.style.animationPlayState = "running";

    if (!window.eqRunning) {
        animateEqualizer();
        window.eqRunning = true;
    }

    /* RECENTLY PLAYED */
    
    if (song) saveRecentlyPlayed(song);
    
    /*DESKTOP PLAYER SYNC */

    document.getElementById("nowPlaying").innerText = song?.title || "No song";
    document.getElementById("artistName").innerText = song?.artist || "";
    document.getElementById("playerThumbnail").src = song?.thumbnail || "";

    document.getElementById("playBtn").innerText = "❚❚";

    document.getElementById("fsPlayBtn").innerText = "❚❚";

    /* FULLSCREEN PLAYER SYNC */
    document.getElementById("fsThumbnail").src = song?.thumbnail || "";
    document.getElementById("fsTitle").innerText = song?.title || "";
    document.getElementById("fsArtist").innerText = song?.artist || "";

    /* FAVORITES */

    if(isFavorite(song)){
        
        fsFavoriteBtn.innerHTML = Icons.heartFilled;
    }else{
        
        fsFavoriteBtn.innerHTML = Icons.heart;
    }

    /* EXTRACTING DOMINANT COLOR */
    applySongTheme(song);
    
    /* GENERATE WAVEFORM */
    
    generateWaveform(song.audio);
    
}

function togglePlay() {
    let btn = document.getElementById("playBtn");
    let eq = document.querySelector(".equalizer");
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 100);

    if (audio.paused) {
        audio.play();

        /* MOBILE PLAY STATE */
        const mobilePlayBtn =
            document.getElementById("mobilePlayBtn");

        const compactPlayBtn =
            document.getElementById("compactPlayBtn");

        const mobileDisc =
            document.getElementById("mobilePlayerThumbnail");

        const compactDisc =
            document.getElementById("compactThumbnail");

        if (mobilePlayBtn) {
            mobilePlayBtn.innerText = "❚❚";
        }

        if (compactPlayBtn) {
            compactPlayBtn.innerText = "❚❚";
        }

        /* RESUME DISC */

        if (mobileDisc) {

            mobileDisc.style.animationPlayState =
                "running";
        }

        if (compactDisc) {

            compactDisc.style.animationPlayState =
                "running";
        }

        btn.innerText = "❚❚";
        document.getElementById("fsPlayBtn").innerText = "❚❚";

        eq.style.opacity = "1";
        const ambient = document.getElementById("musicAmbient");
        
        ambient.classList.add("active");
        ambient.style.animationPlayState = "running";

    } else {
        audio.pause();
        
        /* MOBILE PAUSE STATE */
        const mobilePlayBtn =
            document.getElementById("mobilePlayBtn");

        const compactPlayBtn =
            document.getElementById("compactPlayBtn");

        const mobileDisc =
            document.getElementById("mobilePlayerThumbnail");

        const compactDisc =
            document.getElementById("compactThumbnail");

        if (mobilePlayBtn) {
            mobilePlayBtn.innerText = "▶";
        }

        if (compactPlayBtn) {
            compactPlayBtn.innerText = "▶";
        }

        /* NATURAL DISC STOP */

        if (mobileDisc) {

            mobileDisc.style.animationPlayState =
                "paused";
        }

        if (compactDisc) {

            compactDisc.style.animationPlayState =
                "paused";
        }


        btn.innerText = "▶";
        document.getElementById("fsPlayBtn").innerText = "▶";

        eq.style.opacity = "0.3";
        const ambient = document.getElementById("musicAmbient");

        ambient.style.animationPlayState = "paused";
        ambient.classList.remove("active");
    }
    if (!audio.paused) {
        btn.classList.add("playing");
    } else {
        btn.classList.remove("playing");
    }
}

function playNext() {

    if (!queue.length) return;

    /* SLEEP TIMER */

    if (endAfterCurrentSong) {

        audio.pause();

        showToast({

            icon: "🌙",

            message: "Sleep Timer Finished"

        });

        clearSleepTimer();

        return;

    }

    /* REPEAT CURRENT SONG */

    if (repeatMode === RepeatMode.ONE) {

        playAudio(queue[currentIndex]);

        return;

    }

    /* LAST SONG */

    if (currentIndex >= queue.length - 1) {

        if (repeatMode === RepeatMode.ALL) {

            currentIndex = 0;

            playAudio(queue[currentIndex]);

        } else {

            audio.pause();

            document.getElementById("playBtn").innerHTML = Icons.play;

            document.getElementById("fsPlayBtn").innerHTML = Icons.play;

        }

        return;

    }

    /* NORMAL NEXT */

    if(isShuffle){

        shuffleIndex++;

        if(shuffleIndex >= shuffledQueue.length){

            if(repeatMode === RepeatMode.ALL){

                createShuffleQueue();

                shuffleIndex = 0;

            }else{

                audio.pause();

                return;

            }

        }

        const nextSong = shuffledQueue[shuffleIndex];

        currentIndex = queue.findIndex(
            song => song.audio === nextSong.audio
        );

        playAudio(nextSong);

        return;

    }

    currentIndex++;

    playAudio(queue[currentIndex]);

}

function createShuffleQueue(){

    if(!queue.length) return;

    const currentSong = queue[currentIndex];

    const remainingSongs = queue.filter(
        song => song !== currentSong
    );

    for(let i = remainingSongs.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [remainingSongs[i], remainingSongs[j]] =
        [remainingSongs[j], remainingSongs[i]];

    }

    shuffledQueue = [

        currentSong,

        ...remainingSongs

    ];

    shuffleIndex = 0;

}

function playPrevious() {
    currentIndex = (currentIndex - 1 + queue.length) % queue.length;
    playAudio(queue[currentIndex]);
}

function togglePlayerShuffle() {
    isShuffle = !isShuffle;
    document.getElementById("shuffleBtn").classList.toggle("active");
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    document.getElementById("repeatBtn").classList.toggle("active");
}

function setVolume(val) {
    audio.volume = val;

    let icon = document.getElementById("volumeIcon");

    if (val == 0) icon.innerText = "🔇";
    else if (val < 0.5) icon.innerText = "🔉";
    else icon.innerText = "🔊";
}

function seekAudio(val) {
    audio.currentTime = (val / 100) * audio.duration;
}

function formatTime(sec) {
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}