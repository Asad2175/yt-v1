import { Youtube } from 'interfaces/general';
import { create } from 'zustand';

type videoData = {
  video: Youtube;
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
