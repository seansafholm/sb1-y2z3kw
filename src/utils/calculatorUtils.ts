const LOAN_FEES = {
  underwriting: 1195,
  appraisal: 595,
  flood: 8,
  mers: 24.95,
  taxService: 85,
  constructionInspection: 1225,
  feasibilityAnalysis: 400,
  origination: 0.01 // 1% of loan amount
};

const TITLE_ESCROW_FEES = {
  lendersTitleInsurance: 525,
  closingFee: 350,
  notaryFee: 150,
  recordingFee: 107,
  affordableHousingAct: 225,
  total: 1357
};

export const calculateMaxLoanAmount = (
  homeValue: number,
  totalLiens: number,
  loanLimits: { baseLimit: number; highBalanceLimit: number }
): number => {
  // Calculate 95% of home value (max LTV)
  const maxLtvAmount = homeValue * 0.95;
  
  // Use high balance limit if available, otherwise use base limit
  const countyLimit = loanLimits.highBalanceLimit || loanLimits.baseLimit;
  
  // Take the lower of max LTV amount and county loan limit
  const maxAllowableLoan = Math.min(maxLtvAmount, countyLimit);
  
  // Subtract existing liens, but don't go below 0
  return Math.max(0, maxAllowableLoan - totalLiens);
};

export const calculateMonthlyPayment = (loanAmount: number, interestRate: number): number => {
  if (loanAmount === 0 || interestRate === 0) return 0;
  
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = 30 * 12;
  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
};

export const calculateAPR = (loanAmount: number, interestRate: number): number => {
  if (loanAmount === 0) return 0;

  const fees = calculateLenderFees(loanAmount);
  const totalCost = fees.totalLenderFees + TITLE_ESCROW_FEES.total;
  
  // Convert annual rate to monthly rate
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = 30 * 12;
  
  // Calculate monthly payment based on loan amount and interest rate
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate);
  
  // Function to calculate present value given a rate
  const calculatePV = (rate: number): number => {
    return monthlyPayment * (1 - Math.pow(1 + rate, -numberOfPayments)) / rate;
  };
  
  // Function to calculate the difference between target and actual present value
  const targetPV = loanAmount - totalCost;
  const pvDiff = (rate: number): number => calculatePV(rate) - targetPV;
  
  // Use Newton's method to find APR
  let rate = monthlyRate;
  const EPSILON = 0.0000001;
  const MAX_ITERATIONS = 100;
  
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const diff = pvDiff(rate);
    if (Math.abs(diff) < EPSILON) break;
    
    // Approximate derivative using small delta
    const delta = rate * 0.00001;
    const derivative = (pvDiff(rate + delta) - diff) / delta;
    
    rate = rate - diff / derivative;
  }
  
  // Convert monthly rate back to annual percentage rate
  return rate * 12 * 100;
};

export const calculateLenderFees = (loanAmount: number) => {
  const originationFee = Math.round(loanAmount * LOAN_FEES.origination);
  
  return {
    underwritingFee: LOAN_FEES.underwriting,
    appraisalFee: LOAN_FEES.appraisal,
    floodCheckFee: LOAN_FEES.flood,
    mersFee: LOAN_FEES.mers,
    taxServiceFee: LOAN_FEES.taxService,
    constructionInspectionFee: LOAN_FEES.constructionInspection,
    feasibilityAnalysisFee: LOAN_FEES.feasibilityAnalysis,
    originationFee,
    totalLenderFees: LOAN_FEES.underwriting + 
      LOAN_FEES.appraisal + 
      LOAN_FEES.flood + 
      LOAN_FEES.mers + 
      LOAN_FEES.taxService + 
      LOAN_FEES.constructionInspection +
      LOAN_FEES.feasibilityAnalysis +
      originationFee
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value / 100);
};