import express from 'express'
import connectDB from './src/config/db.js';
import dotenv from 'dotenv'
import Route from './src/routes/index.js'

dotenv.config();

const app = express();
const Name = 'tableflow'
const PORT = process.env.PORT || 3003




app.use(express.json());

connectDB()

app.use('/api/v1', Route)


app.listen(PORT, () => {
  console.log(`Server started successfully at http://localhost:${PORT} - ${Name} backend service!`); 
});
