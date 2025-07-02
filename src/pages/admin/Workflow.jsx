import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const { FiPlus, FiEdit3, FiTrash2, FiMove, FiToggleLeft, FiToggleRight } = FiIcons;

const AdminWorkflow = () => {
  const { t } = useTranslation();
  const [steps, setSteps] = useState([
    {
      id: 1,
      stepNumber: 1,
      title: 'Initial Consultation',
      description: 'Patient inquiry and initial medical assessment',
      phase: 'Initial',
      isActive: true
    },
    {
      id: 2,
      stepNumber: 2,
      title: 'Medical Review',
      description: 'Doctor reviews patient case and medical history',
      phase: 'Planning',
      isActive: true
    },
    {
      id: 3,
      stepNumber: 3,
      title: 'Treatment Planning',
      description: 'Create detailed treatment plan and timeline',
      phase: 'Planning',
      isActive: true
    },
    {
      id: 4,
      stepNumber: 4,
      title: 'Travel Arrangements',
      description: 'Book flights, accommodation, and transfers',
      phase: 'Travel',
      isActive: true
    },
    {
      id: 5,
      stepNumber: 5,
      title: 'Pre-treatment Preparation',
      description: 'Final medical preparations and documentation',
      phase: 'Travel',
      isActive: true
    }
  ]);

  const [isAddingStep, setIsAddingStep] = useState(false);
  const [editingStep, setEditingStep] = useState(null);

  const phases = ['Initial', 'Planning', 'Travel', 'Treatment', 'Follow-up'];

  const handleAddStep = () => {
    const newStep = {
      id: Date.now(),
      stepNumber: steps.length + 1,
      title: 'New Step',
      description: 'Step description',
      phase: 'Initial',
      isActive: true
    };
    setSteps([...steps, newStep]);
    setEditingStep(newStep.id);
    setIsAddingStep(false);
  };

  const handleUpdateStep = (stepId, updates) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const handleDeleteStep = (stepId) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const handleToggleActive = (stepId) => {
    handleUpdateStep(stepId, { 
      isActive: !steps.find(step => step.id === stepId).isActive 
    });
  };

  const moveStep = (stepId, direction) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (
      (direction === 'up' && stepIndex === 0) ||
      (direction === 'down' && stepIndex === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    
    // Swap steps
    [newSteps[stepIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[stepIndex]];
    
    // Update step numbers
    newSteps.forEach((step, index) => {
      step.stepNumber = index + 1;
    });
    
    setSteps(newSteps);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('admin.workflow.title')}
              </h1>
              <p className="text-xl text-gray-600">
                Configure the patient journey workflow steps
              </p>
            </div>
            <Button
              onClick={() => setIsAddingStep(true)}
              className="flex items-center"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              {t('admin.workflow.add_step')}
            </Button>
          </div>
        </motion.div>

        {/* Workflow Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {steps.map((step, index) => (
            <Card key={step.id} className={`transition-all ${!step.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  {/* Step Number */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    step.isActive ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.stepNumber}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    {editingStep === step.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          value={step.title}
                          onChange={(e) => handleUpdateStep(step.id, { title: e.target.value })}
                          placeholder={t('admin.workflow.step_title')}
                        />
                        <Input
                          value={step.description}
                          onChange={(e) => handleUpdateStep(step.id, { description: e.target.value })}
                          placeholder={t('admin.workflow.step_description')}
                        />
                        <select
                          value={step.phase}
                          onChange={(e) => handleUpdateStep(step.id, { phase: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {phases.map(phase => (
                            <option key={phase} value={phase}>{phase}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {step.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            step.phase === 'Initial' ? 'bg-blue-100 text-blue-800' :
                            step.phase === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                            step.phase === 'Travel' ? 'bg-purple-100 text-purple-800' :
                            step.phase === 'Treatment' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {step.phase}
                          </span>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  {/* Move buttons */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => moveStep(step.id, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveStep(step.id, 'down')}
                      disabled={index === steps.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>

                  {/* Toggle Active */}
                  <button
                    onClick={() => handleToggleActive(step.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon 
                      icon={step.isActive ? FiToggleRight : FiToggleLeft} 
                      className="w-5 h-5" 
                    />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => setEditingStep(editingStep === step.id ? null : step.id)}
                    className="p-2 text-gray-400 hover:text-primary-600"
                  >
                    <SafeIcon icon={FiEdit3} className="w-5 h-5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteStep(step.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Save/Cancel buttons for editing */}
              {editingStep === step.id && (
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStep(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setEditingStep(null)}
                  >
                    Save
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </motion.div>

        {/* Add Step Form */}
        {isAddingStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('admin.workflow.add_step')}
              </h3>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingStep(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddStep}>
                  Add Step
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminWorkflow;