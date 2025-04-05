// /components/VoiceButton.js
// /components/VoiceButton.js
import { useState } from 'react';

export default function VoiceButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);  // State to store the audio URL
  const [inputText, setInputText] = useState("");   // State for the textbox input

  const handlePlayVoice = async () => {
    setIsLoading(true);
    
    try {
      // Encode the input text to handle special characters in the URL
      const encodedText = encodeURIComponent(inputText);
      
      // Make a request to Flask API, passing the input text as a query parameter
      const response = await fetch(`http://127.0.0.1:5000/api/voice?text=${encodedText}`);  // Adjust URL if necessary
      
      if (response.ok) {
        const blob = await response.blob();  // Get the audio blob
        
        // Create a URL for the audio blob
        const audioUrl = URL.createObjectURL(blob);
        
        setAudioUrl(audioUrl);  // Set the URL for playback
      } else {
        alert('Failed to fetch audio');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Text input for user to enter text */}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}  // Update input text state
        placeholder="Enter text for speech"
      />
      <button onClick={handlePlayVoice} disabled={isLoading || !inputText}>
        {isLoading ? 'Loading...' : 'Play Voice'}
      </button>

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}


