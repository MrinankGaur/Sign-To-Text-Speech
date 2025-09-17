'use client';

import { useState } from 'react';
import { PlayCircle, Loader2, AlertCircle } from 'lucide-react';

const languageOptions = [
  { code: 'en-US', name: 'English' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'ml-IN', name: 'Malayalam' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'kn-IN', name: 'Kannada' },
];

// Define gender options
const genderOptions = [
    { value: 'FEMALE', label: 'Female' },
    { value: 'MALE', label: 'Male' },
];

export default function Translator() {
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('hi-IN');
  // Add new state for selected voice gender
  const [voiceGender, setVoiceGender] = useState<string>('FEMALE');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleTranslateAndSpeak = async () => {
    if (!inputText.trim()) return;
    setError('');
    setIsProcessing(true);
    setTranslatedText('');

    try {
      let textToSpeak = inputText;
      if (targetLanguage !== 'en-US') {
        const translateResponse = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inputText, targetLanguage: targetLanguage.split('-')[0] }),
        });
        if (!translateResponse.ok) {
            const errData = await translateResponse.json();
            throw new Error(errData.error || 'Translation failed.');
        }
        const { translatedText: newTranslatedText } = await translateResponse.json();
        textToSpeak = newTranslatedText;
        setTranslatedText(newTranslatedText);
      } else {
        setTranslatedText(inputText);
      }

      const speechResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Pass the selected gender to the backend
        body: JSON.stringify({ text: textToSpeak, languageCode: targetLanguage, gender: voiceGender }),
      });
      if (!speechResponse.ok) {
        const errData = await speechResponse.json();
        throw new Error(errData.error || 'Speech generation failed.');
      }
      const { audioContent } = await speechResponse.json();
      
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audio.play();

    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col">
          <label htmlFor="input-text" className="block text-base font-semibold text-gray-700 mb-2">
            Step 1: Gesture Input
          </label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="This is a test sentence. In real use case data will be received from the smart glove."
            className="w-full flex-grow p-4 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
          />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col">
          <label htmlFor="language-select" className="block text-base font-semibold text-gray-700 mb-2">
            Step 2: Select Language & Process
          </label>
          <select
            id="language-select"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          
          {/* New UI for Gender Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Voice Gender</label>
            <div className="flex items-center space-x-4">
              {genderOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={voiceGender === option.value}
                    onChange={(e) => setVoiceGender(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="w-full flex-grow p-4 bg-gray-100 rounded-md border border-gray-300 overflow-y-auto mb-4">
            <p className="text-gray-800">{translatedText || "Translated text will appear here."}</p>
          </div>
          <button
            onClick={handleTranslateAndSpeak}
            disabled={isProcessing || !inputText.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Processing...</>
            ) : (
              <><PlayCircle /> Translate & Speak</>
            )}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-6 w-full p-4 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm text-left flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
        </div>
      )}
    </div>
  );
}