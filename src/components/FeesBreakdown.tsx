import React from 'react';
import { LenderFees } from '../types/fees';
import { formatCurrency } from '../utils/calculatorUtils';

interface FeesBreakdownProps {
  fees: LenderFees;
  loading: boolean;
}

export const FeesBreakdown: React.FC<FeesBreakdownProps> = ({ fees, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          <div className="h-6 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">Estimated Lender Fees</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {formatCurrency(fees.totalLenderFees)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Fee Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Underwriting Fee</span>
              <span>{formatCurrency(fees.underwritingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Appraisal Fee</span>
              <span>{formatCurrency(fees.appraisalFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Flood Check Fee</span>
              <span>{formatCurrency(fees.floodCheckFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>MERS Fee</span>
              <span>{formatCurrency(fees.mersFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax Service Fee</span>
              <span>{formatCurrency(fees.taxServiceFee)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Origination Fee (1%)</span>
              <span>{formatCurrency(fees.originationFee)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};