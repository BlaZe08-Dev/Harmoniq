## 🌐 Live Demo
https://harmoniq-yvun.onrender.com

# 🎧 Harmoniq

Harmoniq is a modern, Spotify-inspired music streaming web app built with Flask and JavaScript.  
It provides a clean UI, smooth user experience, and dynamic music playback using the Jamendo API.

---

## 🚀 Features

### 🎵 Music Playback
- Stream real audio using Jamendo API
- Play / Pause, Next, Previous controls
- Shuffle and Repeat modes
- Seekable progress bar with time display
- Volume control with hover interaction

### 🎶 Queue System
- Add songs to queue
- Click to play any song instantly
- Highlight currently playing track
- Remove songs from queue

### 📂 Playlist System
- Create custom playlists
- Add songs to playlists
- Store playlists using localStorage
- Open and play playlist songs

### 🧠 Smart UI & UX
- Spotify-like layout and design
- Dynamic background based on song artwork
- Smooth animations and hover effects
- Fullscreen player with expand/collapse

### 🔍 Search System
- Debounced search input
- Fast results using Jamendo API
- Local caching for better performance

### 🕒 Recently Played
- Automatically tracks recently played songs
- Displays in album-style layout
- Stored in localStorage

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask)
- **API:** Jamendo Music API
- **Storage:** LocalStorage (client-side)

---

## ▶️ Run Locally

```bash
pip install -r requirements.txt
python app.py
