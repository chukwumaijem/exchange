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
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("eth");
  const [error, setError] = useState("");

  const handleConvert = async () => {
    const resp = await getValue(currency);
    if (resp.success) {
      setValue(resp.data);
    } else {
      setError(resp.message);
    }
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
      {error ? <p>Amount In EUR is: {value}</p> : <p>Error: {error}</p>}
    </div>
  );
}

export default App;
