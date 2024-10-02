import React, { useState, useEffect, useRef } from 'react';
import Chart from './components/Chart';
import Dropdown from './components/Dropdown';

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [candlestickData, setCandlestickData] = useState([]);

  const wsRef = useRef(null);

  const coinData = useRef({
    ethusdt: [],
    bnbusdt: [],
    dotusdt: [],
  });

  useEffect(() => {
    const storedData = localStorage.getItem(selectedCoin);
    if (storedData) {
      coinData.current[selectedCoin] = JSON.parse(storedData);
      setCandlestickData(coinData.current[selectedCoin]);
    }
  }, [selectedCoin]);

  useEffect(() => {
    const symbol = selectedCoin;
    const interval = selectedInterval;

    const connectToWebSocket = () => {
      const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
      wsRef.current = new WebSocket(url);
      if(wsRef.current) console.log('WebSocket Connected.')

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
          coinData.current[symbol] = [
            ...coinData.current[symbol].slice(-2000),
            candle,
          ];
          setCandlestickData(coinData.current[symbol]);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
      };
    };

    if (wsRef.current) {
      wsRef.current.close();
    }
    connectToWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedCoin, selectedInterval]);
  


  useEffect(() => {
    localStorage.setItem(selectedCoin, JSON.stringify(coinData.current[selectedCoin]));
  }, [candlestickData]);
  

  return (
    <div className="h-screen w-full mx-auto p-4 flex flex-col">
      <div className='grow min-h-[10vh] max-h-[30vh]'>
        <Dropdown
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
        />
      </div>
      <div className='flex justify-center items-center w-auto max-w-full h-fit max-h-[80vh]'>
        <Chart candlestickData={candlestickData} />
      </div>
    </div>
  );
};

export default App;