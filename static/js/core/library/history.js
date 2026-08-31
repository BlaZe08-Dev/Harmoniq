/* RECENTLY PLAYED */
function saveRecentlyPlayed(song) {

    let albumId = song.thumbnail;

    // REMOVE DUPLICATE
    recentlyPlayed =
        recentlyPlayed.filter(
            s => s.thumbnail !== albumId
        );

    // ADD TOP
    recentlyPlayed.unshift(song);

    // LIMIT
    if (recentlyPlayed.length > 10) {

        recentlyPlayed.pop();
    }

    localStorage.setItem(
        "recentlyPlayed",
        JSON.stringify(recentlyPlayed)
    );

    renderRecentlyPlayed();
}

/* RENDER RECENTS */
function renderRecentlyPlayed() {

    let container =
        document.getElementById("recentAlbums");

    if (!container) return;

    container.innerHTML = "";

    recentlyPlayed.forEach(song => {

        let div = document.createElement("div");

        div.className = "album-card";

        div.innerHTML = `
            <img src="${song.thumbnail}">

            <div class="album-title">
                ${song.title}
            </div>

            <div class="album-artist">
                ${song.artist}
            </div>
        `;

        div.onclick = () => addToQueue(song);

        container.appendChild(div);
    });
}