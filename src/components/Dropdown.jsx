import React from 'react';

const Dropdown = ({ selectedCoin, setSelectedCoin, selectedInterval, setSelectedInterval }) => {
  return (
    <div className="flex justify-center mb-4">
      <select
        className="mr-2 p-2 border rounded"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
        <option value="dotusdt">DOT/USDT</option>
      </select>

      <select
        className="p-2 border rounded"
        value={selectedInterval}
        onChange={(e) => setSelectedInterval(e.target.value)}
      >
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minutes</option>
        <option value="5m">5 Minutes</option>
      </select>
    </div>
  );
};

export default Dropdown;