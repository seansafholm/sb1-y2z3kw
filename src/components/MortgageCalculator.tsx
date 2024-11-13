import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { CurrencyInput } from './CurrencyInput';
import { AddressInput } from './AddressInput';
import { ResultCard } from './ResultCard';
import { FeesSection } from './FeesSection';
import { MortgageDetails, CalculationResult } from '../types/calculator';
import { calculateMaxLoanAmount, calculateMonthlyPayment, calculateAPR, calculateLenderFees } from '../utils/calculatorUtils';
import { usePMMSRate } from '../hooks/usePMMSRate';
import { fannieMaeApi } from '../services/fannieMaeApi';

export const MortgageCalculator: React.FC = () => {
  const [mortgageDetails, setMortgageDetails] = useState<MortgageDetails>({
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    firstMortgageBalance: 0,
    estimatedHomeValue: 0,
  });

  const [calculationResult, setCalculationResult] = useState<CalculationResult>({
    maxLoanAmount: 0,
    totalNewLoanAmount: 0,
    monthlyPayment: 0,
    interestRate: 0,
    apr: 0,
    totalLiens: 0,
    loanToValue: 0,
    pmmsDate: new Date(),
    county: '',
    state: ''
  });

  const [loading, setLoading] = useState(false);
  const { rate: pmmsRate, date: pmmsDate } = usePMMSRate();

  useEffect(() => {
    if (mortgageDetails.estimatedHomeValue > 0 || mortgageDetails.firstMortgageBalance > 0) {
      calculateResults();
    }
  }, [mortgageDetails.estimatedHomeValue, mortgageDetails.firstMortgageBalance, mortgageDetails.address.zipCode, pmmsRate]);

  const calculateResults = async () => {
    if (mortgageDetails.estimatedHomeValue === 0) return;

    setLoading(true);
    try {
      const loanLimits = await fannieMaeApi.getLoanLimits(mortgageDetails.address.zipCode);
      const totalLiens = mortgageDetails.firstMortgageBalance;

      const maxLoanAmount = calculateMaxLoanAmount(
        mortgageDetails.estimatedHomeValue,
        totalLiens,
        loanLimits
      );

      const totalNewLoanAmount = totalLiens + maxLoanAmount;
      const monthlyPayment = calculateMonthlyPayment(totalNewLoanAmount, pmmsRate);
      const apr = calculateAPR(totalNewLoanAmount, pmmsRate);
      const loanToValue = (totalNewLoanAmount / mortgageDetails.estimatedHomeValue) * 100;

      setCalculationResult({
        maxLoanAmount,
        totalNewLoanAmount,
        monthlyPayment,
        interestRate: pmmsRate,
        apr,
        totalLiens,
        loanToValue,
        pmmsDate: new Date(pmmsDate),
        county: loanLimits.county,
        state: loanLimits.state
      });
    } catch (error) {
      console.error('Error calculating results:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalNewLoanAmount = calculationResult.totalLiens + calculationResult.maxLoanAmount;
  const lenderFees = calculateLenderFees(totalNewLoanAmount);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Home className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">ADU Financing Calculator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>

            <AddressInput
              value={mortgageDetails.address}
              onChange={(address) =>
                setMortgageDetails((prev) => ({
                  ...prev,
                  address,
                }))
              }
            />

            <CurrencyInput
              id="estimatedHomeValue"
              label="Estimated Home Value"
              value={mortgageDetails.estimatedHomeValue}
              onChange={(value) =>
                setMortgageDetails((prev) => ({ ...prev, estimatedHomeValue: value }))
              }
            />

            <CurrencyInput
              id="firstMortgageBalance"
              label="Total Mortgage Balances (All Liens)"
              value={mortgageDetails.firstMortgageBalance}
              onChange={(value) =>
                setMortgageDetails((prev) => ({ ...prev, firstMortgageBalance: value }))
              }
            />
          </div>

          <ResultCard result={calculationResult} loading={loading} />
        </div>

        {totalNewLoanAmount > 0 && (
          <div className="mt-8">
            <FeesSection
              lenderFees={lenderFees}
              loanAmount={totalNewLoanAmount}
            />
          </div>
        )}
      </div>
    </div>
  );
};