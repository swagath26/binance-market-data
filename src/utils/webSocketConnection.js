export const handleMessage = (event, symbol, coinData, setCandlestickData) => {
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

export const handleClose = () => {
  console.log('Previous WebSocket closed.');
};

export const connectToWebSocket = (symbol, interval, coinData, setCandlestickData) => {
    const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
    const ws = new WebSocket(url);

    console.log(`WebSocket connected to ${url}`);

    ws.onmessage = (event) => handleMessage(event, symbol, coinData, setCandlestickData);
    ws.onclose = () => handleClose();

    return ws;
};