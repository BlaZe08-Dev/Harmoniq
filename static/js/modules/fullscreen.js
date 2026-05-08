// FULLSCREEN PLAYER
const expandBtn = document.getElementById("expandBtn");
const expandPath = document.getElementById("expandPath");

if (expandBtn && fsPlayer) {

    expandBtn.onclick = () => {

        fsPlayer.classList.toggle("hidden");

        if (fsPlayer.classList.contains("hidden")) {
            
            if (expandPath) {
                
                expandPath.setAttribute(
                    "d",
                    "M3 3h6v2H5v4H3V3zm16 0v6h-2V5h-4V3h6zM3 15h2v4h4v2H3v-6zm16 0h2v6h-6v-2h4v-4z"
                );
            }

        } else {
            
            if (expandPath) {
                
                expandPath.setAttribute(
                    "d",
                    "M9 9H3v2h4v4h2V9zm12 0h-6v6h2v-4h4V9zM9 15H3v2h6v-6H7v4zm12 2v-2h-4v-4h-2v6h6z"
                );
            }
        }

        document.getElementById("fsPlayBtn").innerText =
            audio.paused ? "▶" : "⏸";
    };
}

const closeFS = document.getElementById("closeFS");

if (closeFS) {

    closeFS.onclick = () => {

        fsPlayer.classList.add("hidden");

        if (expandPath) {
            
            expandPath.setAttribute(
                "d",
                "M3 3h6v2H5v4H3V3zm16 0v6h-2V5h-4V3h6zM3 15h2v4h4v2H3v-6zm16 0h2v6h-6v-2h4v-4z"
            );
        }
    };
}

// FULLSCREEN SEEK
const fsProgress = document.getElementById("fsProgress");

if (fsProgress) {

    fsProgress.addEventListener("input", (e) => {

        audio.currentTime = (e.target.value / 100) * audio.duration;
    });
}