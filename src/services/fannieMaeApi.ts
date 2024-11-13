import { getCountyFromZip } from '../utils/addressUtils';

const CLIENT_ID = '1c5bb1f1-b43f-4c74-a615-b0291be08bc9';
const CLIENT_SECRET = '_tkKUy5HyILpcZDYYeWcflaf3KCUl-cVhrCxGVkN~Www1q~uos1q9_MP7PsX7x.g';

export interface LoanLimitResponse {
  baseLimit: number;
  highBalanceLimit: number;
  county: string;
  state: string;
  isHighCost: boolean;
}

interface CountyLoanLimits {
  [key: string]: {
    baseLimit: number;
    highBalanceLimit: number;
    isHighCost: boolean;
  };
}

// 2024 Loan Limits for California Counties
const CALIFORNIA_LOAN_LIMITS: CountyLoanLimits = {
  "Los Angeles": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "Orange": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "San Francisco": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "San Mateo": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "Santa Clara": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "Alameda": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "San Diego": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "Ventura": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  "Santa Barbara": {
    baseLimit: 766550,
    highBalanceLimit: 1149825,
    isHighCost: true
  },
  // Default for other counties
  "DEFAULT": {
    baseLimit: 766550,
    highBalanceLimit: 766550,
    isHighCost: false
  }
};

class FannieMaeApi {
  async getLoanLimits(zipCode: string): Promise<LoanLimitResponse> {
    try {
      const { county, state } = getCountyFromZip(zipCode);
      console.log('County found:', county); // Debug log
      
      // Get county-specific loan limits or use default
      const countyLimits = CALIFORNIA_LOAN_LIMITS[county] || CALIFORNIA_LOAN_LIMITS["DEFAULT"];
      console.log('County limits:', countyLimits); // Debug log

      return {
        ...countyLimits,
        county,
        state
      };
    } catch (error) {
      console.error('Error fetching loan limits:', error);
      return {
        ...CALIFORNIA_LOAN_LIMITS["DEFAULT"],
        county: "Unknown",
        state: "CA"
      };
    }
  }
}

export const fannieMaeApi = new FannieMaeApi();