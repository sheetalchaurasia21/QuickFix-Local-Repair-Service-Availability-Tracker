import express from 'express'
import connectToDB from './utils/db.js';
import cors from 'cors'
import "dotenv/config"
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import customerRouter from './routes/customer.routes.js'
import bookingRouter from './routes/booking.routes.js'
import providerRouter from './routes/provider.routes.js';


const app=express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// app.get("/", (req, res)=>{
//     res.send("Hello World")
// })

app.use('/api/customer',customerRouter)
app.use('/api/provider',providerRouter)
app.use('/api/booking',bookingRouter)

const PORT=process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`)
    connectToDB()
})