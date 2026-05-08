/* QUEUE */
function addToQueue(item) {
    queue.push(item);

    // Always correct index
    currentIndex = queue.length - 1;

    playAudio(queue[currentIndex].audio);
    updateQueueUI();
}

function updateQueueUI() {

    if (!queueList) return;

    queueList.innerHTML = "";

    queue.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "queue-item";
        div.draggable = true;

        div.innerHTML = `
        <div class="queue-left">
            <img src="${item.thumbnail}">
            <div>
                <div>${item.title}</div>
                <small>${item.artist}</small>
            </div>
        </div>

        <div class="queue-menu">
            ⋮
            <div class="menu-dropdown">
                <div onclick="removeFromQueue(${index}); event.stopPropagation()">Remove</div>
                <div onclick="addSongToPlaylist(${index}); event.stopPropagation()">Add to Playlist</div>
            </div>
        </div>
        `;

        div.onclick = () => {
            currentIndex = index;
            playAudio(item.audio);
            updateQueueUI();
        };

        if (index === currentIndex) {
            div.style.background = "rgba(29,185,84,0.15)";
            div.style.border = "1px solid rgba(29,185,84,0.3)";
        }

        queueList.appendChild(div);
    });
}

function removeFromQueue(index) {

    queue.splice(index, 1);

    if (!queue.length) {

        currentIndex = -1;

    } else if (index <= currentIndex) {

        currentIndex--;
        
    } else if (currentIndex >= queue.length) {
        
        currentIndex = queue.length - 1;
    }

    updateQueueUI();
}