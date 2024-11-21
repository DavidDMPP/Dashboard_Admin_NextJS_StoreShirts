import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="mb-4">
    <div className="bg-red-900/50 border border-red-900 text-red-300 px-4 py-3 rounded-lg">
      <div className="flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        <div className="text-sm">{message}</div>
      </div>
    </div>
  </div>
);

export default ErrorAlert;