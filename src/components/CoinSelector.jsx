import React from "react";

const CoinSelector = ({ selectedCoin, onSelectCoin }) => {
  const coins = ["ethusdt", "bnbusdt", "dotusdt"];

  return (
    <div className="flex justify-center space-x-4">
      {coins.map((coin) => (
        <button
          key={coin}
          onClick={() => onSelectCoin(coin)}
          className={`px-4 py-2 rounded ${
            selectedCoin === coin ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {coin.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CoinSelector;