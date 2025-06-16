import { atom } from 'recoil';
import { TPlaces } from './types';

export const placesState = atom<TPlaces[]>({
  key: 'placesState',
  default: [],
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});
