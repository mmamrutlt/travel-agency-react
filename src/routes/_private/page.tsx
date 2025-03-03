import { useTranslation } from 'react-i18next';
import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3>{t('greetings.home')}</h3>

      <Button className="w-fit" asChild>
        <Link to="/payments">{t('home.links.goToPayments')}</Link>
      </Button>
    </div>
  );
};

export const Route = createFileRoute('/_private/')({ component: HomePage });
