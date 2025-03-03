import { createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const DashboardPage = () => {
  const { t } = useTranslation();

  return <div>{t('greetings.exactPath', { exactPath: '/dashboard/' })}</div>;
};

export const Route = createFileRoute('/_private/dashboard/')({ component: DashboardPage });
