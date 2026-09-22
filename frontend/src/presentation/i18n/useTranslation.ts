import { useI18n } from './I18nContext';

export const useTranslation = () => {
  const { t, language, setLanguage } = useI18n();
  return { t, language, setLanguage };
};
