import React, { useState } from 'react';
import { FaRobot, FaLightbulb, FaLeaf, FaChartLine, FaSpinner } from 'react-icons/fa';
import { askAI } from '../utils/aiService';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';

const Assistant = () => {
  const { isDarkMode } = useTheme();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');

  const quickPrompts = [
    'What crop should I grow in clay soil during the rainy season?',
    'How do I protect my wheat field from pests?',
    'Tell me the key steps to prepare for harvest.',
    'How much water does cotton need in summer?',
    'Give me a market price strategy for rice.'
  ];

  const sectionPrompts = [
    {
      title: 'Crop Advice',
      icon: FaLeaf,
      description: 'Get crop selection and soil guidance for your farm.',
      prompt:
        'Please provide crop advice for a small farmer, focusing on crop selection, soil suitability, planting tips, and pest prevention.',
    },
    {
      title: 'Market Trends',
      icon: FaChartLine,
      description: 'Understand recent price movements and selling timing.',
      prompt:
        'Please explain the current market trends for common crops, including price direction, demand signals, and the best time to sell produce.',
    },
    {
      title: 'Practical Tips',
      icon: FaLightbulb,
      description: 'Receive simple daily actions to improve productivity.',
      prompt:
        'Give practical daily farming tips to improve productivity, reduce waste, and maintain healthy crops on a small farm.',
    },
  ];

  const handleSectionClick = async (prompt) => {
    setQuestion(prompt);
    await handleAsk(prompt);
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
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result || '');
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleAsk = async (prompt) => {
    const finalPrompt = prompt.trim() || (imageFile ? 'Please review the attached crop image and provide farming advice.' : '');
    if (!finalPrompt) {
      setError('Please enter a question for the AI assistant.');
      return;
    }

    setError('');
    setIsLoading(true);
    setAnswer('');

    try {
      const response = await askAI({
        prompt: finalPrompt,
        image: imageFile ? { name: imageFile.name, type: imageFile.type } : null,
      });
      setAnswer(response);
      if (imageFile) {
        setImageFile(null);
        setImagePreview('');
      }
    } catch (err) {
      console.error(err);
      setAnswer('Unable to answer right now. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAsk(question);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card isDarkMode={isDarkMode} className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-3 text-green-800">
                <FaRobot className="text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Farming Assistant</h1>
                <p className="text-sm text-white/80">
                  Ask questions about crops, market prices, weather, pest control, irrigation, and farm management.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {sectionPrompts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSectionClick(item.prompt)}
                    className="rounded-3xl bg-white/15 p-4 backdrop-blur text-left transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-2xl bg-white/25 p-3 text-white">
                        <Icon />
                      </div>
                      <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    </div>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <Card isDarkMode={isDarkMode}>
          <div className="space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ask the AI
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enter your question and the assistant will provide helpful farming advice.
                </p>
              </div>
              <span className={`text-xs font-medium uppercase tracking-[0.2em] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                AI Powered
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={5}
                className={`w-full rounded-3xl border px-4 py-4 text-sm outline-none transition ${
                  isDarkMode
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="How can I improve my harvest this season?"
              />

              {imagePreview && (
                <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <img src={imagePreview} alt="Uploaded crop" className="h-56 w-full object-cover" />
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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Upload crop image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  {imageError && <span className="text-xs text-red-500">{imageError}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
                  Ask AI
                </button>
              </div>
            </form>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {answer && (
              <div className={`rounded-3xl border p-5 ${isDarkMode ? 'border-gray-700 bg-gray-950' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className={`mb-3 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Response
                </h3>
                <p className={`whitespace-pre-line text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {answer}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assistant;
