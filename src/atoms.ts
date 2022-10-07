import { atom } from 'recoil';

/**
 * @exports darkMode atom
 * @description darkMode state
 */
export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});
