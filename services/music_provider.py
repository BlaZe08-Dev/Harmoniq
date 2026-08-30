import os
import requests
from flask_caching import Cache

cache = Cache()


def normalize_track(raw):
    return {
        "title": raw.get("name", ""),
        "artist": raw.get("artist_name", ""),
        "thumbnail": raw.get("album_image", ""),
        "audio": raw.get("audio", ""),
        "source": "jamendo"
    }


@cache.memoize(timeout=600)
def search_jamendo(query):
    client_id = os.environ.get("JAMENDO_CLIENT_ID", "")
    url = f"https://api.jamendo.com/v3.0/tracks/?client_id={client_id}&format=json&limit=10&search={query}"

    try:
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            return []
        data = response.json()
        results = []
        for item in data.get("results", []):
            results.append(normalize_track(item))
        return results
    except requests.RequestException:
        return []
