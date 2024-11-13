interface PMSSResponse {
  rate: number;
  date: Date;
}

export const getCurrentRate = async (): Promise<PMSSResponse> => {
  try {
    // In a production environment, this would make an actual API call to Freddie Mac
    // For now, we'll simulate an API response with the current date
    return {
      rate: 6.79,
      date: new Date() // Use current date to simulate real-time updates
    };
  } catch (error) {
    console.error('Error getting PMMS rate:', error);
    throw error;
  }
};