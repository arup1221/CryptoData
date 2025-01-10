const express = require("express");
const Crypto = require("../models/Crypto");
const calculateSD = require("../utils/calculateSD");

const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// latest stats route
router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin) return res.status(400).json({ error: "Coin is required" });

  const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

  if (!latestData)
    return res.status(404).json({ error: "No data found for this coin" });

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
});



//  standard deviation route
router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin) return res.status(400).json({ error: "Coin is required" });

  const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

  if (data.length < 2)
    return res
      .status(400)
      .json({ error: "Not enough data to calculate deviation" });

  const prices = data.map((record) => record.price);
  const deviation = calculateSD(prices);

  res.json({ deviation });
});

module.exports = router;
