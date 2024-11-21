import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
  children?: React.ReactNode;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'relative w-full rounded-lg border px-4 py-3 text-sm';
    const variantStyles = {
      default: 'bg-gray-800 text-gray-200 border-gray-700',
      destructive: 'bg-red-900/50 text-red-300 border-red-900',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-sm pl-7 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AlertDescription.displayName = 'AlertDescription';

export default Alert;