import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiHome, FiActivity, FiMessageCircle, FiHeart } = FiIcons;

const BottomNav = () => {
  const { t } = useTranslation();
  const { isAuthenticated, profile } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const navItems = [
    {
      name: t('nav.home'),
      href: '/',
      icon: FiHome,
      current: location.pathname === '/'
    },
    {
      name: 'Medical',
      href: '/packages',
      icon: FiActivity,
      current: location.pathname === '/packages'
    },
    {
      name: t('nav.chat'),
      href: '/chat',
      icon: FiMessageCircle,
      current: location.pathname === '/chat'
    },
    {
      name: t('nav.aftercare'),
      href: '/aftercare',
      icon: FiHeart,
      current: location.pathname === '/aftercare',
      show: profile?.role === 'patient'
    }
  ].filter(item => item.show !== false);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              item.current
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <SafeIcon icon={item.icon} className="w-6 h-6" />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;