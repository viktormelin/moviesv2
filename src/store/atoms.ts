import { atomWithStorage } from 'jotai/utils';

export const menuStateAtom = atomWithStorage('savedPage', 'movies');
