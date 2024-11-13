import axios from 'axios';
import { TitleFees } from '../types/fees';

class AtlasTitleApi {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = process.env.ATLAS_TITLE_API_URL || '';
    this.apiKey = process.env.ATLAS_TITLE_API_KEY || '';
  }

  async getTitleFees(loanAmount: number, propertyValue: number): Promise<TitleFees> {
    try {
      const response = await axios.get(`${this.baseUrl}/fees`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        params: {
          loanAmount,
          propertyValue
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching title fees:', error);
      // Return default fees if API fails
      return {
        ownersPolicyFee: 0,
        lendersPolicyFee: 0,
        escrowFee: 0,
        recordingFee: 0,
        notaryFee: 0
      };
    }
  }
}

export const atlasTitleApi = new AtlasTitleApi();