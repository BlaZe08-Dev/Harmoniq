/* FAVORITES STORAGE */

let favorites = [];

function loadFavorites(){

    const saved =
        localStorage.getItem("favorites");

    favorites = saved
        ? JSON.parse(saved)
        : [];
}

function saveFavorites(){

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

function isFavorite(song){

    return favorites.some(
        favorite =>
            favorite.audio === song.audio
    );
}

function toggleFavorite(song){

    if(isFavorite(song)){

        favorites = favorites.filter(
            favorite =>
                favorite.audio !== song.audio
        );

    }else{

        favorites.push(song);
    }

    saveFavorites();

    syncFavoritesPlaylist();

    if (
        document.getElementById("playlistPage").style.display === "block"
    ) {
        openPlaylist("Favorites");
    }
}

loadFavorites();

function syncFavoritesPlaylist(){

    if(favorites.length > 0){

        playlists["Favorites"] = [...favorites];

    }else{

        delete playlists["Favorites"];

    }

    savePlaylists();

    renderPlaylists();
}