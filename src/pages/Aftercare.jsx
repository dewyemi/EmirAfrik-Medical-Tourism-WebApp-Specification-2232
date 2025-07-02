import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const { FiUpload, FiCalendar, FiPhone, FiFileText, FiCheck, FiClock } = FiIcons;

const Aftercare = () => {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const upcomingAppointments = [
    {
      id: 1,
      type: 'Follow-up Consultation',
      doctor: 'Dr. Sarah Ahmed',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'scheduled'
    },
    {
      id: 2,
      type: 'Blood Test Results Review',
      doctor: 'Dr. Michael Johnson',
      date: '2024-01-22',
      time: '2:30 PM',
      status: 'scheduled'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Post-Surgery X-Ray',
      date: '2024-01-08',
      doctor: 'Dr. Sarah Ahmed',
      status: 'reviewed'
    },
    {
      id: 2,
      name: 'Blood Test Results',
      date: '2024-01-05',
      doctor: 'Dr. Michael Johnson',
      status: 'pending'
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      uploadDate: new Date()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

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
            {t('aftercare.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Continue your recovery journey with comprehensive follow-up care
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Reports Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center mb-6">
                <SafeIcon icon={FiUpload} className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('aftercare.upload_reports')}
                </h2>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Upload your medical reports, test results, or recovery photos
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <Button variant="outline">
                    Choose Files
                  </Button>
                </label>
              </div>

              {/* Recent Reports */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                {recentReports.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    {t('aftercare.no_reports')}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{report.name}</p>
                            <p className="text-sm text-gray-500">
                              {report.date} • {report.doctor}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'reviewed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Appointments & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Upcoming Appointments */}
            <Card>
              <div className="flex items-center mb-6">
                <SafeIcon icon={FiCalendar} className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('aftercare.view_schedule')}
                </h2>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {appointment.type}
                        </h3>
                        <p className="text-gray-600">{appointment.doctor}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Scheduled
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Full Schedule
              </Button>
            </Card>

            {/* Contact Doctor */}
            <Card>
              <div className="flex items-center mb-6">
                <SafeIcon icon={FiPhone} className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('aftercare.contact_doctor')}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Dr. Sarah Ahmed</h3>
                  <p className="text-gray-600">Primary Care Physician</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available: Mon-Fri, 9:00 AM - 5:00 PM
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <SafeIcon icon={FiFileText} className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Emergency Contact</h4>
                <p className="text-sm text-red-800">
                  For urgent medical concerns, call our 24/7 emergency line:
                </p>
                <p className="text-lg font-semibold text-red-900 mt-1">
                  +1 (555) 123-4567
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recovery Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900">Surgery Complete</h3>
                <p className="text-sm text-gray-500">January 2, 2024</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900">Initial Recovery</h3>
                <p className="text-sm text-gray-500">Week 1-2</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SafeIcon icon={FiClock} className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Follow-up Care</h3>
                <p className="text-sm text-gray-500">Current Phase</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SafeIcon icon={FiClock} className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">Full Recovery</h3>
                <p className="text-sm text-gray-500">Week 6-8</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Aftercare;