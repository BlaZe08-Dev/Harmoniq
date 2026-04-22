from flask import Flask, render_template, request

App = Flask(__name__)

music_data = {
    "study": ["jfKfPfyJRdk", "5qap5aO4i9A"],
    "gym": ["ml6cT4AZdqI", "2OEL4P1Rz04"],
    "sad": ["hLQl3WQQoQ0", "RgKAFK5djSk"],
    "chill": ["5qap5aO4i9A", "DWcJFNfaw9c"],
    "gaming": ["DWcJFNfaw9c", "jfKfPfyJRdk"]
}

@App.route("/", methods=["GET", "POST"])
def Home():
    video_id = None
    mood = None
    index = 0

    if request.method == "POST":
        mood = request.form.get("mood")
        index = int(request.form.get("index", 0))

        if mood in music_data:
            videos = music_data[mood]
            video_id = videos[index % len(videos)]

    return render_template("index.html", video_id=video_id, mood=mood, index=index)

if __name__ == "__main__":
    App.run(debug=True)