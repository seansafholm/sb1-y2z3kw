import React from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { DollarSign, FileText } from 'lucide-react';

interface FeesSectionProps {
  lenderFees: {
    underwritingFee: number;
    appraisalFee: number;
    floodCheckFee: number;
    mersFee: number;
    taxServiceFee: number;
    constructionInspectionFee: number;
    feasibilityAnalysisFee: number;
    originationFee: number;
    totalLenderFees: number;
  };
  loanAmount: number;
}

export const FeesSection: React.FC<FeesSectionProps> = ({ lenderFees, loanAmount }) => {
  const titleFees = {
    lendersTitleInsurance: 525,
    closingFee: 350,
    notaryFee: 150,
    recordingFee: 107,
    affordableHousingAct: 225
  };

  const totalTitleFees = Object.values(titleFees).reduce((sum, fee) => sum + fee, 0);
  const totalAllFees = lenderFees.totalLenderFees + totalTitleFees;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Estimated Fees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Lender Fees</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Underwriting Fee</span>
              <span>{formatCurrency(lenderFees.underwritingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Appraisal Fee</span>
              <span>{formatCurrency(lenderFees.appraisalFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Construction Inspection Fee</span>
              <span>{formatCurrency(lenderFees.constructionInspectionFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Feasibility Cost Analysis</span>
              <span>{formatCurrency(lenderFees.feasibilityAnalysisFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Flood Check Fee</span>
              <span>{formatCurrency(lenderFees.floodCheckFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>MERS Fee</span>
              <span>{formatCurrency(lenderFees.mersFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax Service Fee</span>
              <span>{formatCurrency(lenderFees.taxServiceFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Origination Fee (1%)</span>
              <span>{formatCurrency(lenderFees.originationFee)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total Lender Fees</span>
              <span>{formatCurrency(lenderFees.totalLenderFees)}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Title & Escrow Fees</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Lender's Title Insurance*</span>
              <span>{formatCurrency(titleFees.lendersTitleInsurance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Closing Fee</span>
              <span>{formatCurrency(titleFees.closingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Notary Fee</span>
              <span>{formatCurrency(titleFees.notaryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Recording Fee</span>
              <span>{formatCurrency(titleFees.recordingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Affordable Housing Act</span>
              <span>{formatCurrency(titleFees.affordableHousingAct)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total Title & Escrow Fees</span>
              <span>{formatCurrency(totalTitleFees)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total Estimated Fees</span>
          <span>{formatCurrency(totalAllFees)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          * Title insurance protects your lender against problems with the title to your property.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          These fees are included in your APR calculation and represent {((totalAllFees / loanAmount) * 100).toFixed(2)}% of your loan amount.
        </p>
      </div>
    </div>
  );
};