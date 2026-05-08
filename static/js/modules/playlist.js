/* PLAYLIST */
function createPlaylist() {
    let name = prompt("Playlist name:");
    if (!name) return;
    playlists[name] = [];
    savePlaylists();
    renderPlaylists();
}

function renderPlaylists() {

    const playlistList = document.getElementById("playlistList");

    if (!playlistList) return;

    playlistList.innerHTML = "";

    Object.keys(playlists).forEach(name => {

        let div = document.createElement("div");

        div.innerText = name;

        div.onclick = () => openPlaylist(name);

        playlistList.appendChild(div);
    });
}

function openPlaylist(name) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("queuePage").style.display = "none";
    document.getElementById("playlistPage").style.display = "block";

    document.getElementById("playlistTitle").innerText = name;
    let container = document.getElementById("playlistSongs");
    
    if (!container) return;

    if (!playlists[name]) return;

    container.innerHTML = "";

    playlists[name].forEach(song => {
        let div = document.createElement("div");
        div.className = "queue-item";

        div.innerHTML = `
            <img src="${song.thumbnail}">
            <div>
                <div>${song.title}</div>
                <small>${song.artist}</small>
            </div>
        `;

        div.onclick = () => playAudio(song.audio);
        container.appendChild(div);
    });
    closeSidebar();
}

function savePlaylists() {
    localStorage.setItem("playlists", JSON.stringify(playlists));
}

function addSongToPlaylist(index) {

    let name = prompt("Playlist name:");

    if (!name) return;

    if (playlists[name]) {

        playlists[name].push(queue[index]);

        savePlaylists();
    }
}