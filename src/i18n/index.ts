import { I18n } from 'i18n-js';
import en from './en/en';
import fr from './fr/fr';
const translations = { en, fr }
export const i18n = new I18n(translations);
i18n.locale = 'en';
i18n.enableFallback = true;