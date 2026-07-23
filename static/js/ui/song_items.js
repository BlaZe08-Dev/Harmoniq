function createSongItem(song, options = {}) {

    const {
        showMenu = false,
        highlight = false,
        draggable = false,
        onClick = null,
        menuIndex = null
    } = options;

    const div = document.createElement("div");

    div.className = "queue-item";

    div.draggable = draggable;

    div.innerHTML = `
        <div class="queue-left">
            <img src="${song.thumbnail}">
            <div>
                <div>${song.title}</div>
                <small>${song.artist}</small>
            </div>
        </div>

        ${
            showMenu
            ?
            `
            <div class="queue-menu">
                ⋮
                <div class="menu-dropdown">
                    <div onclick="removeFromQueue(${menuIndex}); event.stopPropagation()">
                        Remove
                    </div>

                    <div onclick="addSongToPlaylist(${menuIndex}); event.stopPropagation()">
                        Add to Playlist
                    </div>
                </div>
            </div>
            `
            :
            ""
        }
    `;

    if (highlight) {

        div.classList.add("song-active");
    }

    if (onClick) {

        div.onclick = onClick;

    }

    return div;
}

window.createSongItem = createSongItem;