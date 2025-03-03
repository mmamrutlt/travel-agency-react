import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { getAuthStoreState } from '@/stores';
import { LoginForm } from './-components/login-form';

const LoginPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-96 rounded-2xl p-5 shadow">
        <LoginForm />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/(public)/login/')({
  beforeLoad: ({ search }) => {
    const { token } = getAuthStoreState();

    if (token) {
      throw redirect({ to: search.redirect || '/' });
    }
  },
  component: LoginPage,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
});
