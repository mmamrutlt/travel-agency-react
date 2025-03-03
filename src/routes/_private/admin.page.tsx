import { createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const AdminPage = () => {
  const { t } = useTranslation();

  return <div>{t('greetings.exactPath', { exactPath: '/_private/admin/' })}</div>;
};

export const Route = createFileRoute('/_private/admin/')({ component: AdminPage });
