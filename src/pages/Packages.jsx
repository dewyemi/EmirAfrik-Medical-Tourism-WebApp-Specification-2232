import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const { FiHeart, FiBone, FiEye, FiActivity, FiShield } = FiIcons;

const Packages = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: t('packages.filters.all'), icon: FiActivity },
    { id: 'cardiac', name: t('packages.filters.cardiac'), icon: FiHeart },
    { id: 'orthopedic', name: t('packages.filters.orthopedic'), icon: FiBone },
    { id: 'cosmetic', name: t('packages.filters.cosmetic'), icon: FiEye },
    { id: 'dental', name: t('packages.filters.dental'), icon: FiShield },
    { id: 'oncology', name: t('packages.filters.oncology'), icon: FiActivity }
  ];

  const packages = [
    {
      id: 1,
      title: 'Cardiac Surgery Package',
      category: 'cardiac',
      price: 15000,
      duration: 14,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      includes: ['Surgery', 'Hospital Stay', 'Accommodation', 'Airport Transfer'],
      location: 'Cairo, Egypt'
    },
    {
      id: 2,
      title: 'Orthopedic Treatment',
      category: 'orthopedic',
      price: 8000,
      duration: 10,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      includes: ['Surgery', 'Physiotherapy', 'Accommodation', 'Meals'],
      location: 'Nairobi, Kenya'
    },
    {
      id: 3,
      title: 'Cosmetic Surgery Package',
      category: 'cosmetic',
      price: 5000,
      duration: 7,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
      includes: ['Surgery', 'Recovery Care', 'Hotel Stay', 'Follow-up'],
      location: 'Cape Town, South Africa'
    },
    {
      id: 4,
      title: 'Dental Implants',
      category: 'dental',
      price: 3000,
      duration: 5,
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400',
      includes: ['Implants', 'Consultation', 'Hotel', 'Transport'],
      location: 'Tunis, Tunisia'
    }
  ];

  const filteredPackages = selectedFilter === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('packages.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive medical tourism packages designed for your specific needs
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                selectedFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              <SafeIcon icon={filter.icon} className="w-4 h-4" />
              <span className="font-medium">{filter.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                    {pkg.location}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${pkg.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {pkg.duration} days
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {t('packages.package_card.includes')}
                    </h4>
                    <ul className="space-y-1">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <SafeIcon icon={FiShield} className="w-3 h-3 text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1" size="sm">
                      {t('packages.package_card.book_now')}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      {t('packages.package_card.learn_more')}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiActivity} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No packages found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category to see available packages.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Packages;