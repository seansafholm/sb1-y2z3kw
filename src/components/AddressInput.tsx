import React from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressInputProps {
  value: Address;
  onChange: (address: Address) => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({ value = { street: '', city: '', state: '', zipCode: '' }, onChange }) => {
  const handleChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-4 mb-4">
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          id="street"
          value={value?.street || ''}
          onChange={handleChange('street')}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          value={value?.city || ''}
          onChange={handleChange('city')}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <input
          type="text"
          id="state"
          value={value?.state || ''}
          onChange={handleChange('state')}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          value={value?.zipCode || ''}
          onChange={handleChange('zipCode')}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};