let queue = [];
let currentIndex = -1;

let isShuffle = false;
let shuffledQueue = [];
let shuffleIndex = 0;

const RepeatMode = { OFF: 0, ALL: 1, ONE: 2 };
let repeatMode = RepeatMode.OFF;

let debounceTimer;

let recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
let playlists = JSON.parse(localStorage.getItem("playlists")) || {};




const appBg = document.getElementById("appBackground");
