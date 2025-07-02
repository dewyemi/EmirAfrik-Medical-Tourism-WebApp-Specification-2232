import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const { FiHeart, FiShield, FiClock, FiArrowRight, FiStar, FiUsers, FiGlobe } = FiIcons;

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: FiHeart,
      title: t('home.features.personalized.title'),
      description: t('home.features.personalized.description')
    },
    {
      icon: FiShield,
      title: t('home.features.quality.title'),
      description: t('home.features.quality.description')
    },
    {
      icon: FiClock,
      title: t('home.features.support.title'),
      description: t('home.features.support.description')
    }
  ];

  const stats = [
    { icon: FiUsers, value: '5,000+', label: 'Patients Served' },
    { icon: FiStar, value: '4.9/5', label: 'Patient Satisfaction' },
    { icon: FiGlobe, value: '15+', label: 'Countries Covered' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              {t('home.hero.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto"
            >
              {t('home.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/inquiry">
                <Button size="xl" variant="secondary" className="group">
                  {t('home.hero.cta_inquiry')}
                  <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/packages">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  {t('home.hero.cta_packages')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg className="w-full h-20 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={stat.icon} className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes EmirAfrik the trusted choice for medical tourism across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card hover className="h-full text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={feature.icon} className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl text-primary-100">
              Join thousands of patients who have trusted EmirAfrik for their medical tourism needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inquiry">
                <Button size="xl" variant="secondary">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Chat with Expert
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;