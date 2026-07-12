const queueList = document.getElementById("queueList");

/* QUEUE */
function addToQueue(item) {
    queue.push(item);

    // Always correct index
    currentIndex = queue.length - 1;

    playAudio(queue[currentIndex]);
    updateQueueUI();
}

function updateQueueUI() {

    if (!queueList) return;

    queueList.innerHTML = "";

    queue.forEach((item, index) => {
        
        const div = createSongItem(item, {
            
            showMenu: true,

            draggable: true,

            menuIndex: index,

            highlight: index === currentIndex,

            onClick: () => {

                currentIndex = index;

                playAudio(item);

                updateQueueUI();

            }
        });

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