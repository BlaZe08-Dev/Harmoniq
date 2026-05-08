/* SEARCH */
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    searchMusic();
});

searchInput.addEventListener("input", () => {
    let q = searchInput.value.trim();

    if (!q) {

        if (results) {
            results.innerHTML = "";
        }

        return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchMusic();
    }, 600);
});

function searchMusic() {
    let query = searchInput.value.trim().toLowerCase();

    if (!query || query.length < 2) return;

    // 🔥 USE CACHE FIRST
    if (searchCache[query]) {
        showResults(searchCache[query]);
        return;
    }

    fetch("/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ query })
    })
    .then(res => res.json())
    .then(data => {

        // 🔥 SAVE TO CACHE (memory)
        searchCache[query] = data;

        // 🔥 SAVE TO localStorage (persistent)
        localStorage.setItem("searchCache", JSON.stringify(searchCache));

        showResults(data);
    })
        .catch(() => {
        console.log("API failed, using fallback");

        if (searchCache[query]) {
            showResults(searchCache[query]);
        }
    });
}

function showResults(data) {
    
    if (!results) return;
    results.innerHTML = "";

    data.forEach(item => {
        let div = document.createElement("div");
        div.className = "result-item";

        div.innerHTML = `
            <img src="${item.thumbnail}">
            <div>
                <div>${item.title}</div>
                <small>${item.artist}</small>
            </div>
        `;

        div.onclick = () => addToQueue(item);
        results.appendChild(div);
    });
}

/* RECOMMEND */
function loadRecommendations() {

    let container = document.getElementById("recommendList");

    if (!container) return;

    container.innerHTML = "";

    let queries = ["chill", "lofi", "pop", "romantic", "gaming"];

    queries.forEach(q => {

        fetch("/search", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ query: q + " music" })
        })
        .then(res => res.json())
        .then(data => {

            data.forEach(item => {

                let div = document.createElement("div");

                div.className = "recommend-item";

                div.innerHTML = `
                    <img src="${item.thumbnail}">
                    <div>
                        <div>${item.title}</div>
                        <small>${item.artist}</small>
                    </div>
                `;

                div.onclick = () => addToQueue(item);

                container.appendChild(div);
            });
        });
    });
}

/* CLOSE SUGGESTIONS WHEN CLICK OUTSIDE */
document.addEventListener("click", function(e) {

    if (!e.target.closest(".search-container")) {

        if (results) {
            results.innerHTML = "";
        }
    }
});