import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StyleSelector from './components/StyleSelector';
import ImageResult from './components/ImageResult';
import GenerateButton from './components/GenerateButton';
import ApiKeyModal from './components/ApiKeyModal';
import { StyleType } from './types';
import { WALLPAPER_STYLES } from './constants';
import { generateWallpaperImage } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<StyleType>(StyleType.REALISTIC);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // API Key State
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);

  // Initialize checks
  useEffect(() => {
    // 1. Load style preference
    const savedStyle = localStorage.getItem('preferredStyle');
    if (savedStyle && Object.values(StyleType).includes(savedStyle as StyleType)) {
      setSelectedStyle(savedStyle as StyleType);
    }

    // 2. Check for API Key
    const envKey = process.env.API_KEY;
    const storedKey = localStorage.getItem('gemini_api_key');

    if (envKey) {
      setApiKey(envKey);
    } else if (storedKey) {
      setApiKey(storedKey);
    } else {
      setShowApiKeyModal(true);
    }
  }, []);

  const handleStyleSelect = (style: StyleType) => {
    setSelectedStyle(style);
    localStorage.setItem('preferredStyle', style);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowApiKeyModal(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("원하는 이미지를 설명해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const styleConfig = WALLPAPER_STYLES.find(s => s.id === selectedStyle);
      const styleModifier = styleConfig ? styleConfig.promptModifier : '';
      
      // Pass the current apiKey to the service
      const imageUrl = await generateWallpaperImage(prompt, styleModifier, apiKey);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      const errorMessage = err.message || "이미지 생성 중 오류가 발생했습니다.";
      setError(errorMessage);
      
      // If error suggests auth failure, might want to ask for key again
      if (errorMessage.includes("API Key") || errorMessage.includes("403")) {
         // Optional: logic to show modal again if key is invalid
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-slate-950 relative shadow-2xl">
      <Header />
      
      {showApiKeyModal && <ApiKeyModal onSave={handleSaveApiKey} />}

      <main className="flex-1 flex flex-col pt-16 pb-6 overflow-y-auto no-scrollbar">
        {/* Image Display Area */}
        <div className="flex-1 px-4 mb-6 min-h-0 flex flex-col">
          <div className="flex-1 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative">
             <ImageResult imageUrl={generatedImage} isLoading={isLoading} />
             
             {/* Error Toast */}
             {error && (
                <div className="absolute top-4 left-4 right-4 z-30 bg-red-500/90 backdrop-blur text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                  <button onClick={() => setError(null)} className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-80">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
             )}
          </div>
        </div>

        {/* Controls Area */}
        <div className="px-0 flex flex-col gap-4">
          <div className="px-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-slate-400 font-medium ml-1 block">
                스타일 선택
              </label>
              {/* Reset Key Button (Hidden unless hover/needed usually, but kept visible for beta) */}
              <button 
                onClick={() => setShowApiKeyModal(true)}
                className="text-[10px] text-slate-600 hover:text-slate-400 underline px-2"
              >
                API Key 변경
              </button>
            </div>
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onSelect={handleStyleSelect}
              disabled={isLoading}
            />
          </div>

          <div className="px-4 pb-4 bg-slate-950">
            <label className="text-sm text-slate-400 font-medium ml-1 mb-2 block">
              이미지 설명
            </label>
            <div className="relative mb-4">
              <textarea 
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="예: 우주를 떠다니는 고래, 네온 사인 거리"
                disabled={isLoading}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all"
              />
              {prompt && (
                <button 
                  onClick={() => setPrompt('')}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white bg-slate-800 rounded-full p-1"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </div>

            <GenerateButton 
              onClick={handleGenerate} 
              isLoading={isLoading} 
              disabled={!prompt.trim()} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;