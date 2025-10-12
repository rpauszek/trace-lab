from flask import Flask, jsonify, request
import numpy as np

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
    app.run(port=5000)
