import { useEffect, useState } from "react";

export const useBinanceWebSocket = (symbol, interval) => {
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.k) {
        const candlestick = {
          time: data.k.t,
          open: parseFloat(data.k.o),
          high: parseFloat(data.k.h),
          low: parseFloat(data.k.l),
          close: parseFloat(data.k.c),
        };

        setCandlestickData((prev) => [...prev, candlestick]);
      }
    };

    return () => {
      socket.close();
    };
  }, [symbol, interval]);

  return candlestickData;
};