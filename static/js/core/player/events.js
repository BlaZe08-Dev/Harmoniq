/* AUTO NEXT */
if (audio && typeof playNext === "function") {

    audio.addEventListener("ended", playNext);
}

/* DRAG SEEK */

let isDragging = false;

/* WAVEFORM SEEK */

if (waveformContainer) {
    waveformContainer.addEventListener(
        "pointerdown",
        (e)=>{

        isDragging = true;
        isWaveDragging = true;

            handleWaveSeek(e);
        }
    );
}

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

/* WAVEFORM SEEK FUNCTION */

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