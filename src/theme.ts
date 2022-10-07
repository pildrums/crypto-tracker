import { DefaultTheme } from 'styled-components';

/**
 * @augments {string} bgColor, textColor, accentColor
 * @description styled-components에 있는 DefaultTheme으로 타입 지정 가능.
 * @description darkTheme, lightTheme
 */
export const darkTheme: DefaultTheme = {
  bgColor: '#2f3640',
  textColor: '#fff',
  accentColor: '#9c88ff',
  cardColor: 'transparent',
  buttonColor: '#fff',
  buttonIconColor: '#ff884b',
  borderColor: '#fff',
  buttonTextColor: '#2f3640',
};

export const lightTheme: DefaultTheme = {
  bgColor: '#f5f5f5',
  textColor: '#333',
  accentColor: '#9c88ff',
  cardColor: '#fff',
  buttonColor: '#2f3640',
  buttonIconColor: '#fdff00',
  borderColor: '#fff',
  buttonTextColor: '#fff',
};
