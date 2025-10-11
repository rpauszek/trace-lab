from flask import Flask, jsonify, request
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)


@app.route("/sine")
def sine():
    freq = float(request.args.get("freq", 1))
    data = [
        {"x": x / 100, "y": math.sin(2 * math.pi * freq * x / 100)} for x in range(100)
    ]
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
