import { useState } from "react";
function CompoundInterest() {
  const [p, setP] = useState("");
  const [r, setR] = useState("");
  const [t, setT] = useState("");
  const [n, setN] = useState(1);
  const [interest, setInterest] = useState(null);
  const [total, setTotal] = useState(null);
  // Format number with commas
  const formatNumber = (value) => {
    if (!value) return "";
    const number = value.replace(/,/g, "");
    return new Intl.NumberFormat("en-IN").format(number);
  };
  // Currency Formatter
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };
  const calculate = (e) => {
    e.preventDefault();
    if (!p || !r || !t || !n) {
      alert("Please fill all fields");
      return;
    }
    const principal = Number(p.replace(/,/g, ""));
    const rate = Number(r);
    const time = Number(t);
    if (principal <= 0 || rate <= 0 || time <= 0 || n <= 0) {
      alert("Values must be positive numbers");
      return;
    }
    const amount = principal * Math.pow(1 + rate / (100 * n), n * time);
    const ci = amount - principal;
    setInterest(ci);
    setTotal(amount);
  };
  const handleReset = () => {
    setP("");
    setR("");
    setT("");
    setN(1);
    setInterest(null);
    setTotal(null);
  };
  return (
    <form onSubmit={calculate}>
      <input
        type="text"
        placeholder="Principal Amount (₹)"
        value={p}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/,/g, "");
          if (!isNaN(rawValue)) {
            setP(formatNumber(rawValue));
          }
        }}
      />
      <input
        type="number"
        step="any"
        placeholder="Interest Rate (%)"
        value={r}
        onChange={(e) => setR(e.target.value)}
      />
      <input
        type="number"
        step="any"
        placeholder="Time (Years)"
        value={t}
        onChange={(e) => setT(e.target.value)}
      />
      <select value={n} onChange={(e) => setN(Number(e.target.value))}>
        <option value={1}>Yearly (1)</option>
        <option value={2}>Half-Yearly (2)</option>
        <option value={4}>Quarterly (4)</option>
        <option value={12}>Monthly (12)</option>
        <option value={365}>Daily (365)</option>
      </select>
      <button type="submit" className="calculate-btn" disabled={!p || !r || !t}>
        Calculate Result
      </button>
      <button type="button" onClick={handleReset} className="reset-btn">
        Reset
      </button>
      {interest !== null && (
        <div className="result-box">
          <div className="result-row">
            <span>Total Interest:</span>
            <span>{formatCurrency(interest)}</span>
          </div>
          <div className="result-row">
            <span>Final Amount:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      )}
    </form>
  );
}
export default CompoundInterest;
