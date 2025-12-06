import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436-1.153 1.877-2.153 3.5-3.619 5.137C11.953 20.724 10.966 21 10.125 21c-3.148 0-5.7-2.552-5.7-5.7 0-.841.276-1.828 1.178-2.676 1.636-1.466 3.26-2.466 5.137-3.619l-3.325-3.326a2.625 2.625 0 00-3.712 0l-.301.3c-.636.636-.29 1.76.564 1.984l.583.153a.75.75 0 01.536 1.057l-.37.796a2.625 2.625 0 01-3.696.652l-.304-.207a.75.75 0 01-.157-.962l.533-.768a.75.75 0 00.126-.43V4.945a.75.75 0 00-1.5 0v3.627a2.25 2.25 0 002.25 2.25h1.94a.75.75 0 00.53-.22l.707-.707a.75.75 0 000-1.06l-1.35-1.352a1.125 1.125 0 011.59-1.59l3.326 3.325z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          배경화면 AI
        </h1>
      </div>
      <div className="text-xs text-slate-400 px-2 py-1 bg-slate-900 rounded-full border border-slate-800">
        Beta
      </div>
    </header>
  );
};

export default Header;
