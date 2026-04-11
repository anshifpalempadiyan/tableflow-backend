import express from 'express'
import connectDB from './src/config/db.js';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv'
import Route from './src/routes/index.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const Name = 'tableflow'
const PORT = process.env.PORT || 3003


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors({
  credentials : true,
  origin : 'http://localhost:3000',
}))

app.use(express.json());
app.use(cookieParser())

connectDB()

app.use('/api/v1', Route)


app.listen(PORT, () => {
  console.log(`Server started successfully at http://localhost:${PORT} - ${Name} backend service!`); 
});
