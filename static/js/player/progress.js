/* PROGRESS UI */

function updateProgressUI() {

    if (
        !audio ||
        !audio.duration ||
        !isFinite(audio.duration)
    ) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    /* MAIN PLAYER */

    const progressBar = document.getElementById("progressBar");

    const currentTimeText = document.getElementById("currentTime");

    const durationText = document.getElementById("durationText");

    /* FULLSCREEN PLAYER */

    const fsProgress = document.getElementById("fsProgress");

    const fsCurrent = document.getElementById("fsCurrent");

    const fsDuration = document.getElementById("fsDuration");

    /* MAIN PLAYER */

    if (progressBar) {
        progressBar.value = progress;
    }

    if (currentTimeText) {
        currentTimeText.innerText = formatTime(audio.currentTime);
    }

    if (durationText) {
        durationText.innerText = formatTime(audio.duration);
    }

    /* FULLSCREEN PLAYER */

    if (fsProgress) {
        fsProgress.value = progress;
    }

    if (fsCurrent) {
        fsCurrent.innerText = formatTime(audio.currentTime);
    }

    if (fsDuration) {
        fsDuration.innerText = formatTime(audio.duration);
    }
}

/* AUDIO EVENTS */

if (audio) {

    audio.addEventListener(
        "timeupdate",
        updateProgressUI
    );

}