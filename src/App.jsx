import { useState } from "react";
import "./App.css";
import SimpleInterest from "./components/SimpleInterest";
import CompoundInterest from "./components/CompoundInterest";
function App() {
  const [activeTab, setActiveTab] = useState("simple");
  return (
    <div className="main">
      <div className="card">
        <div className="top-icon">₹</div>
        <h1 className="title">Interest Calculator</h1>
        <div className="tab-container">
          <button
            className={activeTab === "simple" ? "active-tab" : ""}
            onClick={() => setActiveTab("simple")}
          >
            Simple
          </button>
          <button
            className={activeTab === "compound" ? "active-tab" : ""}
            onClick={() => setActiveTab("compound")}
          >
            Compound
          </button>
        </div>
        {activeTab === "simple" ? <SimpleInterest /> : <CompoundInterest />}
      </div>
    </div>
  );
}
export default App;