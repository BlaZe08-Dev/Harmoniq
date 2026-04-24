import requests
import html
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

API_KEY = "AIzaSyD2v6Ck_pKvdNGq2wcz0LefIffbQP59fKM"

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search", methods=["POST"])
def search():
    try:
        query = request.json.get("query")

        if not query:
            return jsonify([])

        url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=5&q={query}&key={API_KEY}"

        response = requests.get(url)

        if response.status_code != 200:
            return jsonify([])

        data = response.json()
        results = []

        for item in data.get("items", []):
            video_id = item["id"]["videoId"]
            title = html.unescape(item["snippet"]["title"])

            results.append({
                "title": title,
                "video_id": video_id,
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"]
            })

        return jsonify(results)

    except Exception as e:
        print("ERROR:", e)
        return jsonify([])


if __name__ == "__main__":
    app.run(debug=True)