import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { Step } from '../types';

interface ExecutionProgressProps {
  steps: Step[];
}

const ExecutionProgress: React.FC<ExecutionProgressProps> = ({ steps }) => {
  const getStepIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={18} />;
      case 'processing':
        return <Loader2 className="text-blue-400 animate-spin" size={18} />;
      case 'pending':
      default:
        return <Clock className="text-gray-400" size={18} />;
    }
  };

  const getProgressBarColor = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'processing':
        return 'bg-blue-400';
      case 'pending':
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 overflow-auto max-h-full">
      <h2 className="text-xl font-bold text-white mb-6">Execution Progress</h2>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              {getStepIcon(step.status)}
              <h3 className="font-medium text-white">{step.title}</h3>
            </div>
            
            <p className="text-gray-400 text-sm mb-3">
              {step.description}
            </p>
            
            {step.status !== undefined && (
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${step.status}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-full ${getProgressBarColor(step.status)}`}
                ></motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExecutionProgress;