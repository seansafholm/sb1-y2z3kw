import { useState, useEffect } from 'react';
import { getCurrentRate } from '../services/freddieMacApi';

interface PMSSRate {
  rate: number;
  date: Date;
}

export const usePMMSRate = () => {
  const [rateData, setRateData] = useState<PMSSRate>({
    rate: 6.79, // Default rate as fallback
    date: new Date('2024-11-07') // Default date as fallback
  });

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const data = await getCurrentRate();
        if (data) {
          setRateData({
            rate: data.rate,
            date: new Date(data.date)
          });
        }
      } catch (error) {
        console.error('Error fetching PMMS rate:', error);
        // Keep using default values if fetch fails
      }
    };

    fetchRate();
  }, []);

  return rateData;
};