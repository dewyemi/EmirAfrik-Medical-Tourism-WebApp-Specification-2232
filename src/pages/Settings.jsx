import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('common.settings')}
          </h1>
        </motion.div>

        <Card>
          <p className="text-gray-600">Settings page coming soon...</p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;