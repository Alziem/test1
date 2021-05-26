import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector'

/// Translation

import translations_en from './assets/locales/en/translations.json'
import translations_ar from './assets/locales/ar/translations.json'

i18n
    .use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        defaultNS: ['translations'],
        resources: {
            en: {
                translations: translations_en
            },
            ar: {
                translations: translations_ar
            }
        },
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: true,
            wait: true
        }
    });

export default i18n;