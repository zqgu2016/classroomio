import { LOCALE } from '../types';

export const LANGUAGE = {
  [LOCALE.ZH]: '中文',
  [LOCALE.EN]: 'English'
};

export const LANGUAGES = Object.keys(LANGUAGE).map((lang) => ({
  id: lang,
  text: LANGUAGE[lang]
}));
