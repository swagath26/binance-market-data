import React, { useState, useEffect, useRef } from 'react';
import Chart from './components/Chart';
import Dropdown from './components/Dropdown';

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [candlestickData, setCandlestickData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('ethusdt'); // Set a default symbol (e.g., ETH/USDT)

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value); // Update symbol based on user input
  };  

  const wsRef = useRef(null);

  // Persist data in-memory and restore it when switching coins
  const coinData = useRef({
    ethusdt: [],
    bnbusdt: [],
    dotusdt: [],
  });

  useEffect(() => {
    setSelectedSymbol(selectedCoin);
    const interval = selectedInterval;

    // WebSocket Connection
    const connectToWebSocket = () => {
      const url = `wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${interval}`;
      wsRef.current = new WebSocket(url);

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.k) {
          const candle = {
            time: data.k.t,
            open: data.k.o,
            high: data.k.h,
            low: data.k.l,
            close: data.k.c,
          };

          coinData.current[selectedSymbol] = [
            ...coinData.current[selectedSymbol].slice(-100), // Limit data to the last 100 candles
            candle,
          ];
          setCandlestickData(coinData.current[selectedSymbol]);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        connectToWebSocket();
      };
    };

    if (wsRef.current) {
      wsRef.current.close();
    }
    connectToWebSocket();

    // Cleanup on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedCoin, selectedInterval]);

  useEffect(() => {
    const storedData = localStorage.getItem(selectedSymbol);
    if (storedData) {
      coinData.current[selectedSymbol] = JSON.parse(storedData);
      setCandlestickData(coinData.current[selectedSymbol]);
    }
  }, [selectedCoin]);
  
  useEffect(() => {
    localStorage.setItem(selectedCoin, JSON.stringify(coinData.current[selectedCoin]));
  }, [candlestickData]);
  

  return (
    <div className="container mx-auto p-4">
      <Dropdown
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
      />
      <Chart candlestickData={candlestickData} />
    </div>
  );
};

export default App;