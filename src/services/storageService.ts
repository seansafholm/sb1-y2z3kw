interface StoredCalculation {
  timestamp: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  mortgageDetails: {
    hasFirstMortgage: boolean;
    firstMortgageBalance: number;
    hasSecondMortgage: boolean;
    secondMortgageBalance: number;
    hasOtherLiens: boolean;
    otherLiensBalance: number;
    estimatedHomeValue: number;
  };
  result: {
    maxLoanAmount: number;
    totalNewLoanAmount: number;
    monthlyPayment: number;
    interestRate: number;
    apr: number;
    totalLiens: number;
    loanToValue: number;
    county?: string;
    state?: string;
  };
}

const STORAGE_KEY = 'adu-calculator-entries';

export const storageService = {
  saveCalculation(data: StoredCalculation) {
    try {
      const existingData = this.getCalculations();
      existingData.push(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving calculation:', error);
    }
  },

  getCalculations(): StoredCalculation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting calculations:', error);
      return [];
    }
  },

  clearCalculations() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing calculations:', error);
    }
  }
};