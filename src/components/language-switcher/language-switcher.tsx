import { type resources, useTranslation } from '@/i18n';
import { Button } from '../ui/button';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: keyof typeof resources) => {
    i18n.changeLanguage(lng);
  };

  const languages: { code: keyof typeof resources; label: string }[] = [
    // cspell: disable
    { code: 'en', label: '🇺🇸 English' },
    { code: 'es', label: '🇪🇸 Español' },
    // cspell: enable
  ];

  return (
    <div className="flex space-x-2">
      {languages.map(({ code, label }) => {
        return (
          <Button
            key={code}
            onClick={() => {
              return changeLanguage(code);
            }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
