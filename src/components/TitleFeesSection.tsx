import React from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { FileText } from 'lucide-react';

interface TitleFeesSectionProps {
  loanAmount: number;
}

export const TitleFeesSection: React.FC<TitleFeesSectionProps> = ({ loanAmount }) => {
  const titleFees = {
    lendersTitleInsurance: 525,
    closingFee: 350,
    notaryFee: 150,
    recordingFee: 107,
    affordableHousingAct: 225
  };

  const totalTitleFees = Object.values(titleFees).reduce((sum, fee) => sum + fee, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Title & Escrow Fees</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Lender's Title Insurance*</span>
          <span className="font-semibold">{formatCurrency(titleFees.lendersTitleInsurance)}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Closing Fee</span>
          <span className="font-semibold">{formatCurrency(titleFees.closingFee)}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Notary Fee</span>
          <span className="font-semibold">{formatCurrency(titleFees.notaryFee)}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Recording Fee</span>
          <span className="font-semibold">{formatCurrency(titleFees.recordingFee)}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Affordable Housing Act</span>
          <span className="font-semibold">{formatCurrency(titleFees.affordableHousingAct)}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg mt-6">
          <span className="font-semibold text-blue-900">Total Title & Escrow Fees</span>
          <span className="font-bold text-blue-900">{formatCurrency(totalTitleFees)}</span>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>* Title insurance protects your lender against problems with the title to your property.</p>
          <p className="mt-2">These fees are included in your APR calculation and represent {((totalTitleFees / loanAmount) * 100).toFixed(2)}% of your loan amount.</p>
        </div>
      </div>
    </div>
  );
};