import React from 'react';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  onEnter?: () => void;
  onBlur?: () => void;
  label: string;
  id: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  onEnter,
  onBlur,
  label,
  id,
  disabled = false,
  autoFocus = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(rawValue ? parseInt(rawValue, 10) : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  const formattedValue = value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
        <input
          type="text"
          id={id}
          value={formattedValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          disabled={disabled}
          autoFocus={autoFocus}
          className="block w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="0"
        />
      </div>
    </div>
  );
};