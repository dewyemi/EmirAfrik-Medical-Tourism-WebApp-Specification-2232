import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const { FiCreditCard, FiSmartphone, FiShield, FiCheck } = FiIcons;

const Payment = () => {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: t('payment.card'),
      icon: FiCreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'mobile_money',
      name: t('payment.mobile_money'),
      icon: FiSmartphone,
      description: 'M-Pesa, MTN Mobile Money, Airtel Money'
    }
  ];

  const packageDetails = {
    name: 'Cardiac Surgery Package',
    location: 'Cairo, Egypt',
    duration: '14 days',
    price: 15000,
    includes: [
      'Cardiac Surgery Procedure',
      '7 days hospital stay',
      '7 days hotel accommodation',
      'Airport transfers',
      'Medical coordinator',
      '6 months follow-up care'
    ]
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      // Handle success/failure
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('payment.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Complete your booking with secure payment processing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Package Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('payment.package_summary')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {packageDetails.name}
                    </h3>
                    <p className="text-gray-600">{packageDetails.location}</p>
                    <p className="text-sm text-gray-500">{packageDetails.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">
                      ${packageDetails.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Package Includes:</h4>
                  <ul className="space-y-2">
                    {packageDetails.includes.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>{t('payment.total')}</span>
                    <span className="text-primary-600">
                      ${packageDetails.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('payment.payment_methods')}
              </h2>

              {/* Payment Method Selection */}
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                    />
                    <SafeIcon icon={method.icon} className="w-6 h-6 text-primary-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Payment Form */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                    />
                  </div>
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                  />
                </div>
              )}

              {selectedMethod === 'mobile_money' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Money Provider
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select provider</option>
                      <option value="mpesa">M-Pesa</option>
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="airtel">Airtel Money</option>
                    </select>
                  </div>
                  <Input
                    label="Phone Number"
                    placeholder="+254 700 123 456"
                  />
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg mt-6">
                <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-800">
                  Your payment information is encrypted and secure. We use industry-standard security measures.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePayment}
                loading={processing}
                disabled={processing}
                className="w-full mt-6"
                size="lg"
              >
                {processing 
                  ? t('payment.processing')
                  : `Pay $${packageDetails.price.toLocaleString()}`
                }
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;