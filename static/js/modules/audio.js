const audio = document.getElementById("audioPlayer");
let pixiApp;
/* BAR STORAGE */

let waveBars = [];
const blurFilter =
    new PIXI.BlurFilter();

blurFilter.blur = 20;

blurFilter.quality = 4;

/* PIXI WAVE ENGINE */

const waveformContainer =
    document.getElementById(
        "waveformContainer"
    );
async function initPixi(){

    pixiApp =
        new PIXI.Application();

    await pixiApp.init({

        resizeTo:
            waveformContainer,

        backgroundAlpha: 0,

        antialias: true,

        resolution:
            window.devicePixelRatio || 1
    });

    waveformContainer.appendChild(
        pixiApp.canvas
    );
    pixiApp.stage.addChild(waveGroup);

    pixiApp.stage.addChild(playhead);
    pixiApp.ticker.add(()=>{renderWaveform();});
}

initPixi();


/* MAIN WAVE CONTAINER */

const waveGroup =
    new PIXI.Container();

/* PLAYHEAD */

const playhead =
    new PIXI.Graphics();


const audioContext =
    new (
        window.AudioContext ||
        window.webkitAudioContext
    )();

    
    /* PLAYER */
function playAudio(url) {
    audio.src = url;
    let song = queue[currentIndex];
    console.log("Audio URL:", url);
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

    const ambient = document.getElementById("musicAmbient");

    ambient.classList.add("active");

    ambient.style.animationPlayState = "running";

    if (!window.eqRunning) {
        animateEqualizer();
        window.eqRunning = true;
    }


    if (song) saveRecentlyPlayed(song);

    document.getElementById("nowPlaying").innerText = song?.title || "No song";
    document.getElementById("artistName").innerText = song?.artist || "";
    document.getElementById("playerThumbnail").src = song?.thumbnail || "";

    document.getElementById("playBtn").innerText = "❚❚";

    document.getElementById("fsPlayBtn").innerText = "❚❚";

    // FULLSCREEN SYNC
    document.getElementById("fsThumbnail").src = song?.thumbnail || "";
    document.getElementById("fsTitle").innerText = song?.title || "";
    document.getElementById("fsArtist").innerText = song?.artist || "";

    getDominantColor(song?.thumbnail, (color) => {

        let rgb = color.match(/\d+/g);
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);

        window.harmonicColor = {r, g, b};

        // 🎨 Convert to pastel (soft color)
        let pastelR = Math.floor((r + 255) / 2);
        let pastelG = Math.floor((g + 255) / 2);
        let pastelB = Math.floor((b + 255) / 2);

        let pastelSoft = `rgba(${pastelR},${pastelG},${pastelB},0.35)`;

        // 🎵 PLAYER BAR (FINAL FIX)
        const playerBar = document.querySelector(".player-bar");
        /* MOBILE PLAYERS */

        const mobileExpandedPlayer = document.getElementById("mobileExpandedPlayer");

        const mobileCompactPlayer = document.getElementById("mobileCompactPlayer");

        const waveProgress =document.querySelector(".wave-progress-fill");
        
        /* FULLSCREEN ELEMENTS */

        const fullscreenPlayer =
            document.querySelector(
                ".fullscreen-player"
            );

        const fsThumbnail =
            document.getElementById(
                "fsThumbnail"
            );

        const fsPlayBtn =
            document.getElementById(
                "fsPlayBtn"
            );

        const fsProgress =
            document.getElementById(
                "fsProgress"
            );

        playerBar.style.background = `
            linear-gradient(
                90deg,
                ${pastelSoft},
                rgba(255,255,255,0.05)
            )
        `;

        playerBar.style.boxShadow = `
            0 -6px 30px ${pastelSoft},
            0 -2px 10px rgba(255,255,255,0.05)
        `;

        // 🌌 GLOBAL BACKGROUND (FIXED — now defined)
        let c1 = `rgba(${r},${g},${b},0.35)`;
        let c2 = `rgba(${Math.min(255,r+60)},${Math.min(255,g+40)},${Math.min(255,b+60)},0.25)`;
        let c3 = `rgba(${Math.max(0,r-40)},${Math.max(0,g-40)},${Math.max(0,b-40)},0.4)`;

        appBg.style.background = `
        radial-gradient(circle at 20% 20%, ${c1}, transparent 35%),
        radial-gradient(circle at 80% 30%, ${c2}, transparent 40%),
        radial-gradient(circle at 50% 80%, ${c3}, transparent 45%),
        radial-gradient(circle at center, rgba(0,0,0,0.92) 65%)
        `;

        /* EXTRA AMBIENT GLOW */
        appBg.style.boxShadow = `
            inset 0 0 120px ${c1},
            inset 0 0 180px ${c2},
            inset 0 0 220px ${c3}
        `;

        // 🎧 FULLSCREEN BG
        fsBg.style.background = `
            radial-gradient(circle at top, ${c2}, #000 75%)
        `;

        /* MOBILE EXPANDED PLAYER */

        if(mobileExpandedPlayer){

            mobileExpandedPlayer.style.background = `
                linear-gradient(
                    135deg,
                    ${pastelSoft},
                    rgba(18,18,18,0.82)
                )
            `;

            mobileExpandedPlayer.style.boxShadow = `
                0 0 25px ${pastelSoft}
            `;
        }


        /* MOBILE COMPACT PLAYER */

        if(mobileCompactPlayer){

            mobileCompactPlayer.style.background = `
                linear-gradient(
                    135deg,
                    ${pastelSoft},
                    rgba(18,18,18,0.82)
                )
            `;

            mobileCompactPlayer.style.boxShadow = `
                0 0 20px ${pastelSoft}
            `;
        }


        /* WAVE GLOW */

        if(waveProgress){

            waveProgress.style.boxShadow = `
                0 0 12px ${pastelSoft},
                0 0 22px ${pastelSoft}
            `;
        }

        /* FULLSCREEN CINEMATIC ATMOSPHERE */

        if(fullscreenPlayer){

            fullscreenPlayer.style.background = `
                radial-gradient(
                    circle at top,
                    ${c2},
                    transparent 35%
                ),

                linear-gradient(
                    180deg,
                    rgba(8,8,8,0.96),
                    rgba(0,0,0,1)
                )
            `;
        }


        /* FULLSCREEN ARTWORK GLOW */

        if(fsThumbnail){

            fsThumbnail.style.boxShadow = `
                0 20px 60px rgba(0,0,0,0.45),

                0 0 45px ${pastelSoft},

                0 0 120px ${c2}
            `;
        }


        /* PLAY BUTTON GLOW */

        if(fsPlayBtn){

            fsPlayBtn.style.boxShadow = `
                0 8px 30px ${pastelSoft},

                inset 0 1px 1px rgba(255,255,255,0.10)
            `;
        }


        /* PROGRESS GLOW */

        if(fsProgress){

            fsProgress.style.boxShadow = `
                0 0 18px ${pastelSoft}
            `;
        }

        generateWaveform(url);
    });
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

    currentIndex = (currentIndex + 1) % queue.length;
    playAudio(queue[currentIndex].audio);
}

function playPrevious() {
    currentIndex = (currentIndex - 1 + queue.length) % queue.length;
    playAudio(queue[currentIndex].audio);
}

function toggleShuffle() {
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

/* GENERATE WAVEFORM */

async function generateWaveform(url){
    if(!waveformContainer) return;

    const response =
        await fetch(url);
    if(!response.ok){
        console.error(
            "Waveform fetch failed"
        );
        return;
    }

    const arrayBuffer =
        await response.arrayBuffer();


    const audioBuffer =
        await audioContext.decodeAudioData(
            arrayBuffer
        );

    const rawData =
        audioBuffer.getChannelData(0);

    const samples = 700;

    const blockSize =
        Math.floor(
            rawData.length / samples
        );
    
    const filteredData = [];

    for(let i = 0; i < samples; i++){
        const blockStart =i * blockSize;
        
        let min = 1;
        let max = -1;

        for(let j = 0; j < blockSize; j++){

            const sample =
                rawData[
                    blockStart + j
                ];

            if(sample < min)
                min = sample;

            if(sample > max)
                max = sample;
            }
            
            const peak = max - min;
            
            filteredData.push(peak);
        }
        
        /* NORMALIZE */

        const maxValue = Math.max(...filteredData);

        for(let i = 0; i < filteredData.length; i++){
            filteredData[i] =filteredData[i] / maxValue;
        }

        window.currentWaveform = filteredData;

        buildWaveformWorld(filteredData);

        window.animatedWaveform = [...filteredData];
}

let isWaveDragging = false;
let playheadOpacity = 0;

/* PIXI WAVEFORM RENDER */

function renderWaveform(){

    if(
        !window.currentWaveform
    ) return;

    if(
        !audio.duration ||
        !isFinite(audio.duration)
    ) return;

    const width =
        waveformContainer.clientWidth;

    const height =
        waveformContainer.clientHeight;

    const progress =
        audio.currentTime /
        audio.duration;

    const spacing = 5;

    const currentBar = progress * window.currentWaveform.length;
    
    const centerX = width / 2;

    /* CENTER SCROLL */

    waveGroup.x = centerX - (currentBar * spacing);

    waveGroup.y = 0;

    const { r, g, b } =
        window.harmonicColor ||
        {
            r:255,
            g:255,
            b:255
        };

    /* PLAYHEAD */

    playhead.clear();

    playhead.beginFill(0xffffff, 1);

    playhead.drawRoundedRect(
        centerX - 1,
        18,
        2,
        height - 36,
        999
    );

    playhead.endFill();

    if(isWaveDragging){
        playheadOpacity +=
            (1-playheadOpacity)*0.15;

    }
    else{
        playheadOpacity +=
            (0-playheadOpacity)*0.08;
        }

    playhead.alpha = playheadOpacity;

    /* BAR PHYSICS ENGINE */

    for(let i = 0; i < waveBars.length; i++){

        const bar = waveBars[i];
        
        const barX = waveGroup.x + bar.x;

        const distance = Math.abs(centerX - barX);

        const normalized = Math.min(1, distance / centerX);

        const played = barX < centerX;

        /* CENTER FOCUS */

        const curve = 1 - Math.pow(normalized, 1.8);

        /* ALPHA */

        if(played){

            bar.alpha = 0.18 + curve * 0.25;

        }else{

            bar.alpha = 0.45 + curve * 0.45;
        }

        const { r, g, b } =
            window.harmonicColor ||
            {
                r:255,
                g:255,
                b:255
            };

        /* PLAYED COLOR */

        let tint;

        if(played){

            tint =
                PIXI.Color.shared
                .setValue([
                    r * 0.35,
                    g * 0.35,
                    b * 0.35
                ])
                .toNumber();

        }else{

            tint =
                PIXI.Color.shared
                .setValue([
                    r,
                    g,
                    b
                ])
                .toNumber();
        }

        bar.tint = tint;
    }

    console.log(audio.currentTime, waveGroup.x);
    
}

/* DRAG SEEK */

let isDragging = false;

waveformContainer.addEventListener(
    "pointerdown",
    (e)=>{

        isDragging = true;
        isWaveDragging = true;

        handleWaveSeek(e);
    }
);

window.addEventListener(
    "pointerup",
    ()=>{

        isDragging = false;
        isWaveDragging = false;
    }
);

window.addEventListener(
    "pointermove",
    (e)=>{

        if(!isDragging) return;

        handleWaveSeek(e);
    }
);

function handleWaveSeek(e){

    if(
        !audio.duration ||
        !isFinite(audio.duration)
    ) return;

    if(
        !window.currentWaveform
    ) return;

    const rect = waveformContainer.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const percentage =
        Math.max(
            0,
            Math.min(
                1,
                x / rect.width
            )
        );

    audio.currentTime = percentage * audio.duration;
}

function buildWaveformWorld(data){

    waveGroup.removeChildren();

    waveBars = [];

    const height = waveformContainer.clientHeight;

    const centerY = height * 0.5;

    const spacing = 5;

    const { r, g, b } =

        window.harmonicColor ||

        {
            r:255,
            g:255,
            b:255
        };

    const boostedR = Math.min(255, r * 1.4);
    const boostedG = Math.min(255, g * 1.4);
    const boostedB = Math.min(255, b * 1.4);

    const color = (boostedR << 16) + (boostedG << 8) + boostedB;

    for(let i = 0; i < data.length; i++){

        const value = data[i];

        const bar = new PIXI.Graphics();


        const dynamicHeight = Math.max(12, value * height * 1.15);

        const x = i * spacing;

        const y = centerY;

        bar.beginFill(color, 1);

        bar.drawRoundedRect( 0, 0, 5, dynamicHeight, 999);

        bar.x = x;

        bar.y = centerY - dynamicHeight / 2;

        bar.pivot.set(0, 0);

        bar.endFill();

        waveGroup.addChild(bar);
        // bar.filters = [blurFilter];

        waveBars.push(bar);
    }
}

function renderPlayhead(){

    playhead.clear();

    playhead.beginFill(0xffffff, 1);

    playhead.drawRoundedRect(

        waveformContainer.clientWidth / 2,

        15,

        2,

        waveformContainer.clientHeight - 30,

        999
    );

    playhead.endFill();
}