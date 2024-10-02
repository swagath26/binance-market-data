import { coins, intervals } from '../config/config';

const Dropdown = ({ selectedCoin, setSelectedCoin, selectedInterval, setSelectedInterval }) => {
  return (
    <div className="inline-flex flex-wrap justify-center gap-6">
      <select
        className="p-2 border rounded"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        {coins.map((coin) => (
          <option key={coin.symbol} value={coin.symbol}>{coin.label}</option>
        ))}
      </select>

      <select
        className="p-2 border rounded"
        value={selectedInterval}
        onChange={(e) => setSelectedInterval(e.target.value)}
      >
        {intervals.map((interval) => (
          <option key={interval.value} value={interval.value}>{interval.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;