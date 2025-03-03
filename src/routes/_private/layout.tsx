import { useTranslation } from 'react-i18next';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getAuthStoreState } from '@/stores';

const PrivateLayout = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('greetings.privateLayout')}

      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ location }) => {
    const { token } = getAuthStoreState();

    if (!token) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: PrivateLayout,
});
