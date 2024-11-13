export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface MortgageDetails {
  firstMortgageBalance: number;
  estimatedHomeValue: number;
  address: Address;
}

export interface CalculationResult {
  maxLoanAmount: number;
  totalNewLoanAmount: number;
  monthlyPayment: number;
  interestRate: number;
  apr: number;
  totalLiens: number;
  loanToValue: number;
  pmmsDate: Date;
  county?: string;
  state?: string;
}