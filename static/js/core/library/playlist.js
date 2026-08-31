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
        
        const div = createSongItem(song, {
            
            showMenu: false,
            
            highlight: currentSong?.audio === song.audio,
            
            onClick: () => {
                
                playAudio(song);
                
                openPlaylist(name);
            
            }
        });
        
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

window.renderPlaylists = renderPlaylists;
window.savePlaylists = savePlaylists;