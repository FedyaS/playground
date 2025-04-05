import os
from groq import Groq
from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the Groq API key from the environment
groq_api_key = os.getenv('GROQ_API_KEY')
client = Groq(api_key=groq_api_key)

def getAudioFile(text):    
    speech_file_path = "speech.wav"
    response = client.audio.speech.create(
      model="playai-tts",
      voice="Aaliyah-PlayAI",
      response_format="wav",
      input=text,
    )
    response.write_to_file(speech_file_path)
    return speech_file_path

