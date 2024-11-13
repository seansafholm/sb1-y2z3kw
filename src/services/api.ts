import { PMMSRate, LoanLimit, Address } from '../types/api';
import { fannieMaeApi } from './fannieMaeApi';
import { freddieMacApi } from './freddieMacApi';

export const getPMMSRate = async (): Promise<PMMSRate> => {
  try {
    const rate = await freddieMacApi.getCurrentRate();
    const currentDate = new Date().toISOString();
    
    return {
      rate,
      date: currentDate,
      source: 'https://www.freddiemac.com/pmms'
    };
  } catch (error) {
    console.error('Error fetching PMMS rate:', error);
    return {
      rate: 6.5,
      date: new Date().toISOString(),
      source: 'https://www.freddiemac.com/pmms'
    };
  }
};

export const getLoanLimit = async (address: Address): Promise<LoanLimit> => {
  try {
    const baseLimit = await fannieMaeApi.getLoanLimits(address.zipCode);
    
    return {
      baseLimit,
      county: 'Your County', // We'll implement proper county lookup later
      state: address.state,
      zipCode: address.zipCode
    };
  } catch (error) {
    console.error('Error fetching loan limits:', error);
    return {
      baseLimit: 766550, // 2024 baseline conforming limit
      county: '',
      state: address.state,
      zipCode: address.zipCode
    };
  }
};