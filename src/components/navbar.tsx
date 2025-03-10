import { Link, useNavigate, useRouter } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';
import { setAuthStoreToken } from '@/stores';

export const Navbar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm(t('navbar.logoutConfirm'))) {
      setAuthStoreToken(null);
      router.invalidate().finally(() => {
        navigate({ to: '/login' });
      });
    }
  };

  const navItems = [
    { label: t('navbar.home'), path: '/' },
    { label: t('navbar.cities'), path: '/cities' },
    { label: t('navbar.airlines'), path: '/airlines' },
    { label: t('navbar.flights'), path: '/flights' },
    { label: t('navbar.logout'), path: '#', onClick: handleLogout },
  ];

  return (
    <nav className="bg-blue-400">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex items-center space-x-4">
            {navItems.map((item, index) => {
              return (
                <button
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-500"
                  key={index}
                >
                  <Link to={item.path}>{item.label}</Link>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
