const app = require("./app");
const fetchCryptoData = require("./jobs/fetchCryptoData");
require("./cron");

// require("dotenv").config(); 
// const connectDB = require("./src/config/db"); 
// connectDB();

const PORT = 8000;

fetchCryptoData();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
