from flask import Flask, render_template, request, jsonify
import requests, time, os
from dotenv import load_dotenv

load_dotenv()  
cache = {}
CACHE_TTL = 600 #10 minutes
app = Flask(__name__)

JAMENDO_CLIENT_ID = os.getenv("JAMENDO_CLIENT_ID")  # 🔥 put your Jamendo client ID here


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search", methods=["POST"])
def search():
    query = request.json.get("query").lower()

    
    # Cache with expiry
    if query in cache:
        data, timestamp = cache[query]
        if time.time() - timestamp < CACHE_TTL:
            return jsonify(data)

    url = f"https://api.jamendo.com/v3.0/tracks/?client_id={JAMENDO_CLIENT_ID}&format=json&limit=10&search={query}"

    response = requests.get(url)
    data = response.json()

    results = []

    for item in data.get("results", []):
        results.append({
            "title": item["name"],
            "artist": item["artist_name"],
            "thumbnail": item["album_image"],
            "audio": item["audio"]  # ✅ REAL AUDIO URL
        })

    # 🔥 STORE WITH TIME
    cache[query] = (results, time.time())

    return jsonify(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)   