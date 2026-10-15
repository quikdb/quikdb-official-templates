from flask import Flask, jsonify

app = Flask(__name__)

@app.get('/health')
def health():
    return jsonify(ok=True, marker='quikdb-template-python-flask-v1')

@app.get('/')
def home():
    return jsonify(message='Your QuikDB Flask API is live.')
