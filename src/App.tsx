import React from 'react';
import { MortgageCalculator } from './components/MortgageCalculator';
import { usePMMSRate } from './hooks/usePMMSRate';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { rate, date } = usePMMSRate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MortgageCalculator />
        <Footer pmmsDate={date} />
      </div>
    </div>
  );
};

export default App;