from flask import Flask, jsonify, request
import numpy as np
import sys
import os

app = Flask(__name__)


@app.route("/")
def index():
    return jsonify({"message": "Hello from Flask backend!"})


@app.route("/sine")
def sine_wave():
    try:
        freq = float(request.args.get("freq", 1))
        x = np.linspace(0, 2 * np.pi, 100)
        y = np.sin(freq * x)
        return jsonify({"x": x.tolist(), "y": y.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    is_frozen = getattr(sys, "frozen", False)
    port = int(os.environ.get("FLASK_PORT", 5000))

    if is_frozen:
        # Production: use Waitress
        from waitress import serve

        serve(app, host="127.0.0.1", port=port)
    else:
        # Development: use Flask server with reloader disabled
        app.run(port=port, debug=True, use_reloader=False)
