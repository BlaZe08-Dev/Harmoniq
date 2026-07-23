/* EQUALIZER */
function animateEqualizer() {

    let bars = document.querySelectorAll(".equalizer span");

    if (!bars.length) return;

    if (!audio.paused) {

        bars.forEach((bar, i) => {

            let base =
                Math.sin(Date.now() / 200 + i) * 0.5 + 0.5;

            let height = 6 + base * 18;

            bar.style.height = height + "px";
        });
    }

    requestAnimationFrame(animateEqualizer);
}
