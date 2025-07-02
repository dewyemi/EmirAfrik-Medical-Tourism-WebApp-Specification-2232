import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

const Input = forwardRef(({
  label,
  error,
  className = '',
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const inputClasses = clsx(
    'w-full px-3 py-2 border rounded-lg text-sm transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    error 
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500'
      : 'border-gray-300 text-gray-900 placeholder-gray-400',
    disabled && 'bg-gray-50 cursor-not-allowed',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;