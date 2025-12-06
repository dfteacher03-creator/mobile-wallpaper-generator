import React from 'react';
import { StyleType } from '../types';
import { WALLPAPER_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyle: StyleType;
  onSelect: (style: StyleType) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, disabled }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2">
        {WALLPAPER_STYLES.map((style) => {
          const [icon, label] = style.label.split(' ');
          const isSelected = selectedStyle === style.id;
          
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              disabled={disabled}
              className={`
                flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200
                border h-full min-h-[72px]
                ${isSelected
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
              `}
            >
              <span className="text-xl mb-1 filter drop-shadow-md">{icon}</span>
              <span className={`text-[11px] font-medium leading-tight ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;