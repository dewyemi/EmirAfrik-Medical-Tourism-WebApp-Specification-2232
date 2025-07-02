import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';

const { FiUser, FiCalendar, FiMapPin, FiClock } = FiIcons;

const Dashboard = () => {
  const { t } = useTranslation();

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      currentStep: 3,
      assignedEmployee: 'Sarah Johnson',
      lastUpdate: '2024-01-10',
      treatment: 'Cardiac Surgery',
      status: 'In Treatment'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      currentStep: 1,
      assignedEmployee: 'Mike Chen',
      lastUpdate: '2024-01-09',
      treatment: 'Orthopedic',
      status: 'Planning'
    }
  ];

  const workflowSteps = [
    { number: 1, title: 'Initial Consultation', phase: 'Initial' },
    { number: 2, title: 'Treatment Planning', phase: 'Planning' },
    { number: 3, title: 'Travel Arrangements', phase: 'Travel' },
    { number: 4, title: 'Treatment', phase: 'Treatment' },
    { number: 5, title: 'Follow-up Care', phase: 'Follow-up' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('dashboard.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Manage patient workflows and track treatment progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <SafeIcon icon={FiUser} className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-gray-600">Active Patients</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <SafeIcon icon={FiCalendar} className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-gray-600">This Week</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-gray-600">Pending Reviews</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <SafeIcon icon={FiMapPin} className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-gray-600">Total Patients</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Workflow Kanban */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Workflow</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step) => (
                <div key={step.number} className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      Step {step.number}
                    </h3>
                    <p className="text-sm text-gray-600">{step.title}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                      {step.phase}
                    </span>
                  </div>

                  {/* Patient Cards in this step */}
                  <div className="space-y-3">
                    {patients
                      .filter(patient => patient.currentStep === step.number)
                      .map((patient) => (
                        <Card key={patient.id} className="p-4 bg-white border border-gray-200">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <SafeIcon icon={FiUser} className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {patient.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {patient.treatment}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>{t('dashboard.patient_card.assigned_to', { employee: patient.assignedEmployee })}</p>
                            <p>{t('dashboard.patient_card.last_update', { date: patient.lastUpdate })}</p>
                          </div>
                          
                          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                            patient.status === 'In Treatment'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {patient.status}
                          </span>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;