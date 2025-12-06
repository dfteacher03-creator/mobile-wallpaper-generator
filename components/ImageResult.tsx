import React, { useState } from 'react';

interface ImageResultProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ImageResult: React.FC<ImageResultProps> = ({ imageUrl, isLoading }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    setIsDownloading(true);
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `wallpaper-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download failed", e);
      alert("다운로드에 실패했습니다. 브라우저 설정을 확인해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!imageUrl) return;
    
    try {
      // Need to convert base64 to blob for sharing in some browsers
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'wallpaper.png', { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          title: '내 AI 배경화면',
          text: '배경화면 AI로 만든 이미지입니다.',
          files: [file]
        });
      } else {
        alert("이 브라우저는 공유 기능을 지원하지 않습니다. 이미지를 다운로드하여 공유해주세요.");
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (!imageUrl && !isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-700 p-8 min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <p className="text-center font-medium">하단의 입력창에 원하는 내용을 적고<br/>배경화면을 생성해보세요.</p>
        <p className="text-xs mt-2 text-slate-600">예: 비오는 서울의 거리, 사이버펑크 고양이</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
       {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm rounded-2xl">
           <div className="relative w-24 h-24">
             <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-800"></div>
             <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-purple-500 animate-spin"></div>
           </div>
           <p className="mt-6 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">
             환상적인 배경화면 생성 중...
           </p>
        </div>
      )}

      {imageUrl && (
        <div className="relative group w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <img 
            src={imageUrl} 
            alt="Generated Wallpaper" 
            className="w-full h-full object-cover"
          />
          
          {/* Action Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-white text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition-all"
            >
              {isDownloading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              )}
              저장
            </button>
            
            <button 
              onClick={handleShare}
              className="bg-slate-800/80 backdrop-blur text-white p-3 rounded-xl hover:bg-slate-700 active:scale-95 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResult;
