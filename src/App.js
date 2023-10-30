import React, { useState } from "react";
import { useEffect } from "react";

function App() {
  const [loading, setLoding] = useState(true);
  const [coins, setConis] = useState([]);
  const [money, setMoney] = useState(0);
  const [getCoin, setGetCoin] = useState(0);
  const [coinName, setConinName] = useState("");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((reponse) => reponse.json())
    .then((json) => {
      setConis(json.slice(0, 100));
      setLoding(false);
    });
  },[]);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const onSelect = (event) => {
    setGetCoin(coins[event.target.selectedIndex].quotes.USD.price);
    setConinName(coins[event.target.selectedIndex].name);
  };
return (
    <div>
      <h2>The Coins {loading ? null : `(${coins.length})`}</h2>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <h1>Write Your Seed Money</h1>
          <input type="number" value={money} onChange={onChange}></input> USD
          <div>
            <h2>Select Coin</h2>
            <select onChange={onSelect}>
              {coins.map((coin) => (
                <option>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price.toFixed(2)} USD
                </option>
              ))}
            </select>
            <h2>YOU CAN BUY  { getCoin > 0 ? (money / getCoin).toFixed(2) : null } AMOUNT OF {coinName} </h2>
          </div>
        </>
      )}
    </div>
);
}

export default App;
