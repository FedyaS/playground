# app.py
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS  # Import CORS
import callVoice

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains (you can restrict this to specific domains if needed)


# Simple route that returns "Hello, World!"
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Example API endpoint
@app.route('/api/greet', methods=['GET'])
def greet():
    return jsonify({"message": "Hello from Flask API!"})

@app.route('/api/voice', methods=['GET'])
def voice():
    text = request.args.get('text', '')  # Get the 'text' parameter from the query string
    if text:
        # Generate TTS audio with the input text
        speech_file_path = callVoice.getAudioFile(text)  # Assuming getAudioFile accepts the text as input
        return send_file(speech_file_path, mimetype="audio/wav")  # Return the audio file
    else:
        return jsonify({"error": "No text provided"}), 400


if __name__ == '__main__':
    app.run(debug=True)
