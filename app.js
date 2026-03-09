import express from 'express'
import connectDB from './src/config/db.js';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const Name = 'tableflow'
const PORT = process.env.PORT || 3003




app.use(express.json());

connectDB()


app.listen(PORT, () => {
  console.log(`Server started successfully at http://localhost:${PORT} - ${Name} backend service!`); 
});
