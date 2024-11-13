import React from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCurrency, formatPercent } from '../utils/calculatorUtils';
import { ArrowRight, DollarSign, Percent, Calendar } from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult;
  loading: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, loading }) => {
  const totalNewLoanAmount = result.totalLiens + result.maxLoanAmount;

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-lg p-6 space-y-4">
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
        <h3 className="text-2xl font-bold text-gray-900">New First Mortgage Details</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {formatCurrency(totalNewLoanAmount)}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Current Mortgage Balance</span>
          </div>
          <span className="font-semibold">{formatCurrency(result.totalLiens)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Available For ADU</span>
          </div>
          <span className="font-semibold">{formatCurrency(result.maxLoanAmount)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Percent className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Interest Rate*</span>
          </div>
          <span className="font-semibold">{formatPercent(result.interestRate)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Percent className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">APR</span>
          </div>
          <span className="font-semibold">{formatPercent(result.apr)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Est. Monthly Payment</span>
          </div>
          <span className="font-semibold">{formatCurrency(result.monthlyPayment)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <ArrowRight className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Loan To Value</span>
          </div>
          <span className="font-semibold">{formatPercent(result.loanToValue)}</span>
        </div>
      </div>

      <div className="mt-4">
        <a
          href="https://adu-financing-qualification.secure-clix.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Approved Today!
        </a>
      </div>
    </div>
  );
};