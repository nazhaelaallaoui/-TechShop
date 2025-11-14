import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('EUR'); // Default to EUR
  const [exchangeRate, setExchangeRate] = useState(1); // EUR to MAD rate

  // Mock exchange rates (in a real app, this would come from an API)
  const exchangeRates = {
    EUR: 1,
    MAD: 10.8, // 1 EUR = 10.8 MAD approximately
    USD: 1.08, // 1 EUR = 1.08 USD approximately
  };

  useEffect(() => {
    setExchangeRate(exchangeRates[currency] || 1);
  }, [currency]);

  const convertPrice = (priceInEUR) => {
    return (priceInEUR * exchangeRate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'MAD':
        return 'DH';
      case 'USD':
        return '$';
      case 'EUR':
      default:
        return '€';
    }
  };

  const formatPrice = (priceInEUR) => {
    const convertedPrice = convertPrice(priceInEUR);
    const symbol = getCurrencySymbol();
    return `${convertedPrice} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        getCurrencySymbol,
        availableCurrencies: ['EUR', 'MAD', 'USD']
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
