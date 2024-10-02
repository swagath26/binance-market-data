import React, { useState, useEffect, useRef } from 'react';
import Chart from './components/Chart';
import Dropdown from './components/Dropdown';
import { connectToWebSocket } from './utils/webSocketConnection';
import { getStoredData, saveToLocalStorage } from './utils/storageUtil';
import { coins, intervals } from './config/config';

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState(coins[0].symbol);
  const [selectedInterval, setSelectedInterval] = useState(intervals[0].value);
  const [candlestickData, setCandlestickData] = useState([]);

  const wsRef = useRef(null);

  // Initialize the coinData for each coins with empty arrays
  const coinData = useRef(
    coins.reduce((acc, coin) => {
      acc[coin.symbol] = [];
      return acc;
    }, {})
  );

  // Function to reset the current graph
  const resetCurrentGraph = () => {
    coinData.current[selectedCoin] = [];
    setCandlestickData([]);
    localStorage.setItem(selectedCoin, JSON.stringify([]));
  };

  // Load previously stored data for the selected coin
  useEffect(() => {
    coinData.current[selectedCoin] = getStoredData(selectedCoin);
    setCandlestickData(coinData.current[selectedCoin]);
  }, [selectedCoin]);

  // Save candlestick data to local storage when it updates
  useEffect(() => {
    saveToLocalStorage(selectedCoin, coinData.current[selectedCoin]);
  }, [candlestickData]);

  // Disconnect and Reconnect WebSocket connection with selction change in coin and interval
  useEffect(() => {
    const symbol = selectedCoin;
    const interval = selectedInterval;

    wsRef.current = connectToWebSocket(symbol, interval, coinData, setCandlestickData);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('WebSocket closing...');
      }
    };
  }, [selectedCoin, selectedInterval]);

  return (
    <div className="h-screen w-full p-4 flex flex-col">
      <div className='flex flex-wrap justify-center gap-8 gap-y-6 py-6 items-center min-h-fit max-h-[20vh]'>
        
        <button
          onClick={resetCurrentGraph}
          className="px-4 py-2 rounded border border-solid border-neutral-200 active:bg-neutral-100 hover:bg-blue-100 text-nowrap"
        >Reset Current Graph</button>
        
        <Dropdown
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
        />
        
      </div>
      <div className='flex p-4 grow justify-center items-center w-full h-fit min-h-72 min-w-64 max-w-full max-h-[80vh]'>
        <Chart candlestickData={candlestickData} />
      </div>
    </div>
  );
};

export default App;