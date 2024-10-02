import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Title, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, Title, Legend, CandlestickController, CandlestickElement);

const ChartComponent = ({ candlestickData }) => {
  const data = {
    datasets: [
      {
        label: 'Candlestick Data',
        data: candlestickData.map(candle => ({
          x: candle.time,
          o: candle.open,
          h: candle.high,
          l: candle.low,
          c: candle.close,
        })),
        borderColor: '#333',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Chart type="candlestick" data={data} options={options} />;
};

export default ChartComponent;