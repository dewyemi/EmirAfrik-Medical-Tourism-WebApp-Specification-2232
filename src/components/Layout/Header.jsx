import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageProvider';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/supabase';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiMenu, FiX, FiGlobe, FiUser, FiLogOut, FiChevronDown } = FiIcons;

const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  const { user, profile, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const navigation = [
    { name: t('nav.home'), href: '/', current: location.pathname === '/' },
    { name: t('nav.packages'), href: '/packages', current: location.pathname === '/packages' },
  ];

  if (isAuthenticated) {
    navigation.push(
      { name: t('nav.chat'), href: '/chat', current: location.pathname === '/chat' },
    );

    if (profile?.role === 'patient') {
      navigation.push(
        { name: t('nav.aftercare'), href: '/aftercare', current: location.pathname === '/aftercare' }
      );
    }

    if (profile?.role === 'employee') {
      navigation.push(
        { name: t('nav.dashboard'), href: '/dashboard', current: location.pathname === '/dashboard' }
      );
    }

    if (profile?.role === 'admin') {
      navigation.push(
        { name: t('nav.admin'), href: '/admin/workflow', current: location.pathname.startsWith('/admin') }
      );
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EmirAfrik</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <SafeIcon icon={FiChevronDown} className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                          currentLanguage === lang.code ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span className="hidden sm:inline">{profile?.full_name || user?.email}</span>
                  <SafeIcon icon={FiChevronDown} className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`}
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('common.profile')}
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('common.settings')}
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                        <span>{t('common.logout')}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  {t('common.register')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 py-4"
            >
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                      item.current
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;