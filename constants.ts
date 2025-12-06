import { StyleType } from './types';

export const WALLPAPER_STYLES = [
  { id: StyleType.REALISTIC, label: '📸 실사', promptModifier: 'photorealistic, 8k, highly detailed, cinematic lighting' },
  { id: StyleType.ANIME, label: '🎨 애니', promptModifier: 'anime style, studio ghibli, vibrant colors' },
  { id: StyleType.MINIMALIST, label: '✨ 심플', promptModifier: 'minimalist, simple, clean lines, negative space, flat design' },
  { id: StyleType.FANTASY, label: '🐉 판타지', promptModifier: 'fantasy world, magical, ethereal, dreamlike' },
  { id: StyleType.CYBERPUNK, label: '🌃 사이버펑크', promptModifier: 'cyberpunk, neon lights, futuristic, night city' },
  { id: StyleType.WATERCOLOR, label: '💧 수채화', promptModifier: 'watercolor painting, soft edges, artistic, pastel colors' },
  { id: StyleType.OIL_PAINTING, label: '🖼️ 유화', promptModifier: 'oil painting texture, visible brushstrokes, classic art style' },
  { id: StyleType.PIXEL_ART, label: '👾 픽셀', promptModifier: 'pixel art, 16-bit, retro game style' },
];

export const MODEL_NAME = 'gemini-2.5-flash-image';
