export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface LoanLimitResponse {
  baseLimit: number;
  county: string;
  state: string;
}

export interface PMMSResponse {
  rate: number;
}