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
import adminRouter from './routes/admin.routes.js';
import cron from "node-cron";
import { updateToOngoingIfTimeMatches } from "./utils/bookingScheduler.js";


const app=express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use(cors({
    origin:[process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use('/api/customer',customerRouter)
app.use('/api/provider',providerRouter)
app.use('/api/booking',bookingRouter)
app.use("/api/admin", adminRouter);

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT=process.env.PORT;

app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`)
    connectToDB()
})

cron.schedule("* * * * *", () => {
  updateToOngoingIfTimeMatches();
});