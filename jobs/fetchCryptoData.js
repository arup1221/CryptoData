const axios = require("axios");
const Crypto = require("../models/Crypto");

const fetchCryptoData = async () => {
  const coins = ["bitcoin", "matic-network", "ethereum"];
  const url = `https://api.coingecko.com/api/v3/simple/price`;
  
  // https://api.coingecko.com/api/v3/simple/price

  try {
    const { data } = await axios.get(url, {
      params: {
        ids: coins.join(","),
        vs_currencies: "usd",
        include_market_cap: "true",
        include_24hr_change: "true",
      },
    });

    for (const coin of coins) {
      await Crypto.create({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
    }

    console.log("Cryptocurrency data updated");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

module.exports = fetchCryptoData;
