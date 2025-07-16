
'use client';
import React from 'react';
import { useTranslation } from 'next-i18next';
import i18n from '@/i18n'; // Use the path to your initialized i18n.js // Ensure i18n is imported correctly if needed
// import { i18n } from 'next-i18next';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ar', label: 'العربية' }
];

export default function I18nPanel() {
  const { t } = useTranslation('common');
  const handleLangChange = (lang: string) => {
    if (i18n) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <>
      <div className="mb-4 flex gap-2">
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => handleLangChange(l.code)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            {l.label}
          </button>
        ))}
      </div>
      <p className="text-center text-red-400 dark:text-white/60">
        {t('dashboardDescription')}
      </p>
    </>
  );
}