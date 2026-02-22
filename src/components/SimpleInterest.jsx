import { useState } from "react";
function SimpleInterest() {
  const [p, setP] = useState("");
  const [r, setR] = useState("");
  const [t, setT] = useState("");
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
    if (!p || !r || !t) {
      alert("Please fill all fields");
      return;
    }
    const principal = Number(p.replace(/,/g, ""));
    const rate = Number(r);
    const time = Number(t);
    if (principal <= 0 || rate <= 0 || time <= 0) {
      alert("Values must be positive numbers");
      return;
    }
    const si = (principal * rate * time) / 100;
    const finalAmount = principal + si;
    setInterest(si);
    setTotal(finalAmount);
  };
  const handleReset = () => {
    setP("");
    setR("");
    setT("");
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
export default SimpleInterest;
