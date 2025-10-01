import { Youtube } from 'interfaces/youtube';
import { create } from 'zustand';

type videoData = {
  video: Youtube;
  type: 'mp3' | 'mp4' | 'thumbnail';
  downloadButton: string;
  url: string;
};

type Store = {
  selectedVideo: videoData | null;
  setSelectedVideo: (video: videoData | null) => void;
};

export const useVideoStore = create<Store>((set) => ({
  selectedVideo: null,
  setSelectedVideo: (video) => set({ selectedVideo: video }),
}));
