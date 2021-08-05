import React, { useState } from "react";

import { getValue } from "../services";
import "./App.css";

const currencies = [
  {
    name: "ETH",
    value: "eth",
  },
  {
    name: "LTC",
    value: "ltc",
  },
  {
    name: "XRP",
    value: "xrp",
  },
];

function App() {
  const [value, setValue] = useState("-");
  const [currency, setCurrency] = useState("eth");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    const resp = await getValue(currency);
    if (resp.success) {
      setValue(resp.data);
      setError("");
    } else {
      setError(resp.message);
      setValue("");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <input disabled defaultValue="From amount is constant is always 1" />
      <select
        defaultValue={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {currencies.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={handleConvert}>Estimate Button</button>
      <p>Arrow</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {error ? (
            <span>Error: {error}</span>
          ) : (
            <span>Amount In EUR is: {Number(value).toFixed(2)}</span>
          )}
        </p>
      )}
    </div>
  );
}

export default App;
