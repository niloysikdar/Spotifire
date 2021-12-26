import { atom } from 'recoil';

export const currentTrackState = atom({
  key: 'currentTrackState',
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
