import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

const { FiUser, FiHeart, FiMapPin, FiCheck } = FiIcons;

const Inquiry = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const steps = [
    { number: 1, title: t('inquiry.steps.medical'), icon: FiHeart },
    { number: 2, title: t('inquiry.steps.personal'), icon: FiUser },
    { number: 3, title: t('inquiry.steps.preferences'), icon: FiMapPin },
    { number: 4, title: t('inquiry.steps.review'), icon: FiCheck }
  ];

  const urgencyOptions = [
    { value: 'low', label: t('inquiry.medical_form.urgency_options.low') },
    { value: 'medium', label: t('inquiry.medical_form.urgency_options.medium') },
    { value: 'high', label: t('inquiry.medical_form.urgency_options.high') },
    { value: 'emergency', label: t('inquiry.medical_form.urgency_options.emergency') }
  ];

  const onSubmit = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      reset();
    } else {
      // Submit final form
      toast.success('Inquiry submitted successfully!');
      console.log('Final form data:', updatedData);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('inquiry.medical_form.condition')}
              </label>
              <textarea
                {...register('condition', { required: 'This field is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder={t('inquiry.medical_form.condition_placeholder')}
              />
              {errors.condition && (
                <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
              )}
            </div>

            <Input
              label={t('inquiry.medical_form.treatment')}
              {...register('treatment', { required: 'This field is required' })}
              error={errors.treatment?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('inquiry.medical_form.urgency')}
              </label>
              <select
                {...register('urgency', { required: 'This field is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select urgency level</option>
                {urgencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.urgency && (
                <p className="mt-1 text-sm text-red-600">{errors.urgency.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Input
              label={t('inquiry.personal_form.full_name')}
              {...register('fullName', { required: 'This field is required' })}
              error={errors.fullName?.message}
            />

            <Input
              label={t('inquiry.personal_form.email')}
              type="email"
              {...register('email', { 
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />

            <Input
              label={t('inquiry.personal_form.phone')}
              {...register('phone', { required: 'This field is required' })}
              error={errors.phone?.message}
            />

            <Input
              label={t('inquiry.personal_form.country')}
              {...register('country', { required: 'This field is required' })}
              error={errors.country?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('inquiry.personal_form.age')}
                type="number"
                {...register('age', { required: 'This field is required', min: 1, max: 120 })}
                error={errors.age?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('inquiry.personal_form.gender')}
                </label>
                <select
                  {...register('gender', { required: 'This field is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('inquiry.preferences_form.budget')}
              </label>
              <select
                {...register('budget', { required: 'This field is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="under-5000">Under $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-20000">$10,000 - $20,000</option>
                <option value="20000-50000">$20,000 - $50,000</option>
                <option value="over-50000">Over $50,000</option>
              </select>
              {errors.budget && (
                <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
              )}
            </div>

            <Input
              label={t('inquiry.preferences_form.destination')}
              {...register('destination')}
              placeholder="e.g., Egypt, Kenya, South Africa"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('inquiry.preferences_form.accommodation')}
              </label>
              <select
                {...register('accommodation')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select accommodation type</option>
                <option value="hotel-3star">3-Star Hotel</option>
                <option value="hotel-4star">4-Star Hotel</option>
                <option value="hotel-5star">5-Star Hotel</option>
                <option value="apartment">Serviced Apartment</option>
                <option value="recovery-center">Recovery Center</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...register('travelCompanion')}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('inquiry.preferences_form.travel_companion')}
                </span>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="font-medium text-gray-900 mb-3">Medical Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Condition:</strong> {formData.condition}</p>
                  <p><strong>Treatment:</strong> {formData.treatment}</p>
                  <p><strong>Urgency:</strong> {formData.urgency}</p>
                </div>
              </Card>

              <Card>
                <h4 className="font-medium text-gray-900 mb-3">Personal Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Name:</strong> {formData.fullName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Country:</strong> {formData.country}</p>
                </div>
              </Card>
            </div>

            <Card>
              <h4 className="font-medium text-gray-900 mb-3">Preferences</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <p><strong>Budget:</strong> {formData.budget}</p>
                <p><strong>Destination:</strong> {formData.destination || 'Any'}</p>
                <p><strong>Accommodation:</strong> {formData.accommodation || 'Standard'}</p>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('inquiry.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your medical needs and we'll create a personalized plan for you
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <SafeIcon icon={FiCheck} className="w-5 h-5" />
                  ) : (
                    <SafeIcon icon={step.icon} className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="mb-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={currentStep === 1}
                >
                  {t('common.previous')}
                </Button>

                <Button type="submit">
                  {currentStep === 4 ? t('common.submit') : t('common.next')}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Inquiry;