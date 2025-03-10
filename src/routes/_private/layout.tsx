import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { Navbar } from '@/components/navbar';
import { getAuthStoreState } from '@/stores';
const PrivateLayout = () => {
  return (
    <div>
      <Navbar />
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
