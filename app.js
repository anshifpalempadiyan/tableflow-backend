const express = require("express");
const connectDB = require("./src/config/db");
const app = express();

require("dotenv").config();


const PORT = process.env.PORT || 3003
app.use(express.json());

connectDB()


app.listen(PORT, () => {
  console.log(`Server started successfully at http://localhost:${PORT} - Alziyara Admin Backend Service!`); 
});