from flask import Flask, render_template, request, jsonify
from config import Config
from services.music_provider import cache, search_jamendo

app = Flask(__name__)
app.config.from_object(Config)
cache.init_app(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search", methods=["POST"])
def search():
    try:
        data = request.get_json(force=True, silent=True) or {}
        query = data.get("query")
        if not query or not isinstance(query, str):
            return jsonify({"error": "Invalid or missing 'query' parameter"}), 400
    except Exception:
        return jsonify({"error": "Malformed JSON payload"}), 400

    results = search_jamendo(query.lower().strip())
    return jsonify(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=app.config["DEBUG"])   