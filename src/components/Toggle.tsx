import React from 'react';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  id: string;
}

export const Toggle: React.FC<ToggleProps> = ({ value, onChange, label, id }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          value ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};