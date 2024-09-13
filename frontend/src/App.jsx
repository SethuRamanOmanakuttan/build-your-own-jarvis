// App.js
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [showArcReactor, setShowArcReactor] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowArcReactor(true);
      setResponse("How can I help you today?");
    }, 3000);

    if (!browserSupportsSpeechRecognition) {
      setResponse("Sorry, your browser does not support speech recognition.");
    }

    return () => {
      clearTimeout(timer);
      resetTranscript();
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      sendMessageToServer(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const toggleListening = () => {
    if (!browserSupportsSpeechRecognition) {
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch("http://localhost:3000/converse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.response);
      speakResponse(data.response);
    } catch (error) {
      console.error("Error sending message to server:", error);
      setResponse("Sorry, I encountered an error. Please try again later.");
    }
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  return (
    <div className='app-container'>
      {" "}
      {isLoading ? (
        <div className='loading-container'>
          <div className='arc-reactor loading'>
            <div className='circle-1'></div>
            <div className='circle-2'></div>
            <div className='circle-3'></div>
            <div className='circle-4'></div>
            <div className='circle-5'></div>
            <div className='inner-circle'>
              <div className='core'></div>
            </div>
          </div>
          <div className='jarvis-text'>
            <span>J</span>
            <span>A</span>
            <span>R</span>
            <span>V</span>
            <span>I</span>
            <span>S</span>
          </div>
        </div>
      ) : (
        <>
          {showArcReactor && (
            <div
              className={`arc-reactor ${listening ? "listening" : ""}`}
              onClick={toggleListening}
            >
              <div className='circle-1'></div>
              <div className='circle-2'></div>
              <div className='circle-3'></div>
              <div className='circle-4'></div>
              <div className='circle-5'></div>
              <div className='inner-circle'>
                <div className='core'></div>
              </div>
              <div className='line-1'></div>
              <div className='line-2'></div>
              <div className='line-3'></div>
              <div className='line-4'></div>
              <div className='line-5'></div>
              <div className='line-6'></div>
            </div>
          )}
          <div className='response-text'>{response}</div>
          <button className='talk-button' onClick={toggleListening}>
            {listening ? "Stop" : "Talk"}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
