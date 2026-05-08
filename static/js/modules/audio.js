/* PLAYER */
function playAudio(url) {
    audio.src = url;
    console.log("Audio URL:", url);
    audio.muted = false;
    audio.volume = 1;
    audio.play();
    const ambient = document.getElementById("musicAmbient");

    ambient.classList.add("active");

    ambient.style.animationPlayState = "running";

    if (!window.eqRunning) {
        animateEqualizer();
        window.eqRunning = true;
    }

    let song = queue[currentIndex];
    if (song) saveRecentlyPlayed(song);

    document.getElementById("nowPlaying").innerText = song?.title || "No song";
    document.getElementById("artistName").innerText = song?.artist || "";
    document.getElementById("playerThumbnail").src = song?.thumbnail || "";

    document.getElementById("playBtn").innerText = "⏸";

    // FULLSCREEN SYNC
    document.getElementById("fsThumbnail").src = song?.thumbnail || "";
    document.getElementById("fsTitle").innerText = song?.title || "";
    document.getElementById("fsArtist").innerText = song?.artist || "";

    getDominantColor(song?.thumbnail, (color) => {

        let rgb = color.match(/\d+/g);
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);

        // 🎨 Convert to pastel (soft color)
        let pastelR = Math.floor((r + 255) / 2);
        let pastelG = Math.floor((g + 255) / 2);
        let pastelB = Math.floor((b + 255) / 2);

        let pastelSoft = `rgba(${pastelR},${pastelG},${pastelB},0.35)`;

        // 🎵 PLAYER BAR (FINAL FIX)
        const playerBar = document.querySelector(".player-bar");

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
    });
}    

function togglePlay() {
    let btn = document.getElementById("playBtn");
    let eq = document.querySelector(".equalizer");
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 100);

    if (audio.paused) {
        audio.play();

        btn.innerText = "⏸";
        document.getElementById("fsPlayBtn").innerText = "⏸";

        eq.style.opacity = "1";
        const ambient = document.getElementById("musicAmbient");
        
        ambient.classList.add("active");
        ambient.style.animationPlayState = "running";

    } else {
        audio.pause();

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