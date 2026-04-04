import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import deTranslations from './locales/de.json';
import enTranslations from './locales/en.json';

const resources = {
  de: {
    translation: deTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources,
});

export default i18next;
