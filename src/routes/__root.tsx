import { Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet, useNavigate, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { env } from '@/config/env';
import { useTranslation } from '@/i18n';
import { setAuthStoreToken, useAuthStoreToken } from '@/stores';

const RootComponent = () => {
  const { t } = useTranslation();

  const token = useAuthStoreToken();

  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setAuthStoreToken(null);

      router.invalidate().finally(() => {
        navigate({ to: '/login' });
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-between bg-purple-300 p-4">
        <span>{t('greetings.rootLayout')}</span>

        <div className="flex gap-x-2">
          <LanguageSwitcher />

          {token ? <Button onClick={handleLogout}>{t('buttons.logOut')}</Button> : null}
        </div>
      </div>

      <Outlet />

      {env.VITE_APP_ENV === 'local' && env.VITE_ENABLE_DEVTOOLS ? (
        <Suspense>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </Suspense>
      ) : null}
    </div>
  );
};

export const Route = createRootRoute({ component: RootComponent });
