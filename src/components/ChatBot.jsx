import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaComments, FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import { askAI } from '../utils/aiService';
import { useTheme } from '../contexts/ThemeContext';

const ChatBot = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('chatBotMessages') || '[]');
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');
  const [lastResponse, setLastResponse] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const scrollRef = useRef(null);

  const suggestions = useMemo(
    () => [
      'What crop is best for loamy soil in the rainy season?',
      'What are the latest wheat prices?',
      'How can I protect my crop from pests?',
      'When should I harvest rice?',
      'How much water does cotton need?'
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem('chatBotMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result || '');
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please upload a valid image file.');
      return;
    }

    setImageError('');
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSend = async () => {
    const prompt = input.trim() || (imageFile ? 'Please review the attached crop image and give farming advice.' : '');
    if (!prompt) {
      return;
    }

    const userMessage = {
      id: Date.now() + Math.random(),
      sender: 'user',
      text: imageFile
        ? `${prompt} [Image attached: ${imageFile.name}]`
        : prompt,
    };

    addMessage(userMessage);
    setLastQuestion(prompt);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAI({
        prompt,
        history: [...messages, userMessage],
        image: imageFile ? { name: imageFile.name, type: imageFile.type } : null,
      });

      addMessage({
        id: Date.now() + Math.random(),
        sender: 'assistant',
        text: response,
      });
      setLastResponse(response);
    } catch (error) {
      addMessage({
        id: Date.now() + Math.random(),
        sender: 'assistant',
        text: 'Unable to generate a response right now. Please try again later.',
      });
      setLastResponse('Unable to generate a response right now. Please try again later.');
    } finally {
      setIsLoading(false);
      if (imageFile) {
        handleRemoveImage();
      }
    }
  };

  const handleSuggestion = (text) => {
    setInput(text);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          className={`w-[360px] max-w-full rounded-3xl border shadow-2xl overflow-hidden ${
            isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b gap-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white rounded-full p-2">
                <FaRobot />
              </div>
              <div>
                <p className="font-semibold">Smart Farming AI</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ask any farming question</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-96 overflow-y-auto px-4 py-3 space-y-3" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="rounded-2xl bg-green-50 dark:bg-green-900/40 p-4 text-sm text-gray-700 dark:text-gray-100">
                Hello! I can help with crop advice, market prices, weather, pest control, and farm planning.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-3xl p-3 max-w-[85%] ${
                    message.sender === 'user'
                      ? 'self-end bg-green-500 text-white'
                      : 'self-start bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                  }`}
                >
                  <div className="text-sm leading-6">{message.text}</div>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-gray-200 dark:border-gray-700 px-4 py-3"
          >
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
              Try a quick question
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestion(suggestion)}
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {imagePreview && (
              <div className="mb-3 rounded-3xl overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <img src={imagePreview} alt="Uploaded crop" className="h-40 w-full object-cover" />
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900">
                  <span className="text-xs text-gray-600 dark:text-gray-300">{imageFile?.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <label className="inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
              {imageError && <span className="text-xs text-red-500">{imageError}</span>}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the AI a farming question..."
                className={`flex-1 rounded-full border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-green-500 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`rounded-full px-4 py-3 text-white transition ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>

            <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-gray-950 dark:text-gray-200">
              <p className="font-semibold mb-2">Latest AI response</p>
              {isLoading ? (
                <p>Thinking... Please wait.</p>
              ) : lastResponse ? (
                <p className="whitespace-pre-line">{lastResponse}</p>
              ) : (
                <p>Enter a question or upload a crop image to get a response.</p>
              )}
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-green-500 text-white hover:bg-green-400'
            : 'bg-green-600 text-white hover:bg-green-500'
        }`}
      >
        <FaComments className="text-xl" />
      </button>
    </div>
  );
};

export default ChatBot;
