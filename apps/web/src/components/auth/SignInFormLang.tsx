'use client';

import { useTranslation } from 'react-i18next';

export default function SignInFormLang() {
  const { t } = useTranslation('common');

  return (
    <form>
      <div>
        <label htmlFor="email">{t('signin.email')}</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">{t('signin.password')}</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">{t('signin.submit')}</button>
      <a href="#">{t('signin.forgotPassword')}</a>
      <p>
        {t('signin.noAccount')} <a href="/signup">{t('signin.signup')}</a>
      </p>
    </form>
  );
}