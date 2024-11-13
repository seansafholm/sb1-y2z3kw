import { LenderFees } from '../types/fees';

const FIXED_FEES = {
  underwritingFee: 1195,
  appraisalFee: 595,
  floodCheckFee: 8,
  mersFee: 24.95,
  taxServiceFee: 85,
  constructionInspectionFee: 1225,
  feasibilityAnalysisFee: 400
};

export const calculateLenderFees = (loanAmount: number): LenderFees => {
  const originationFee = loanAmount * 0.01; // 1% of loan amount
  
  const fees = {
    ...FIXED_FEES,
    originationFee,
    totalLenderFees: 0
  };
  
  // Calculate total fees
  fees.totalLenderFees = Object.values(fees).reduce((sum, fee) => 
    typeof fee === 'number' ? sum + fee : sum, 0
  );

  return fees;
};