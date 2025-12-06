import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative w-full py-4 rounded-xl font-bold text-white text-lg tracking-wide
        overflow-hidden transition-all duration-300
        ${disabled 
          ? 'bg-slate-800 cursor-not-allowed text-slate-500' 
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60 active:scale-[0.98]'
        }
      `}
    >
      <div className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436-1.153 1.877-2.153 3.5-3.619 5.137C11.953 20.724 10.966 21 10.125 21c-3.148 0-5.7-2.552-5.7-5.7 0-.841.276-1.828 1.178-2.676 1.636-1.466 3.26-2.466 5.137-3.619l-3.325-3.326a2.625 2.625 0 00-3.712 0l-.301.3c-.636.636-.29 1.76.564 1.984l.583.153a.75.75 0 01.536 1.057l-.37.796a2.625 2.625 0 01-3.696.652l-.304-.207a.75.75 0 01-.157-.962l.533-.768a.75.75 0 00.126-.43V4.945a.75.75 0 00-1.5 0v3.627a2.25 2.25 0 002.25 2.25h1.94a.75.75 0 00.53-.22l.707-.707a.75.75 0 000-1.06l-1.35-1.352a1.125 1.125 0 011.59-1.59l3.326 3.325z" clipRule="evenodd" />
        </svg>
        배경화면 생성하기
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
           <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-sm font-medium">AI가 생각중...</span>
        </div>
      )}
    </button>
  );
};

export default GenerateButton;
