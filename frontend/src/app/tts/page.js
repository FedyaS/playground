"use client";
// pages/tts.js

import { useEffect, useState } from "react";

export default function TTSPage() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState("Hello, this is offline text to speech.");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log("Available voices:", availableVoices);
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Text-to-Speech Demo</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter text to speak..."
      />

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Voice:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedVoice?.name}
          onChange={(e) =>
            setSelectedVoice(voices.find((v) => v.name === e.target.value))
          }
        >
          {voices.map((voice, i) => (
            <option key={i} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={speak}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        🔊 Speak
      </button>
    </div>
  );
}
