export enum StyleType {
  REALISTIC = '실사 (Realistic)',
  ANIME = '애니메이션 (Anime)',
  CYBERPUNK = '사이버펑크 (Cyberpunk)',
  WATERCOLOR = '수채화 (Watercolor)',
  MINIMALIST = '미니멀 (Minimalist)',
  FANTASY = '판타지 (Fantasy)',
  OIL_PAINTING = '유화 (Oil Painting)',
  PIXEL_ART = '픽셀 아트 (Pixel Art)'
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}
