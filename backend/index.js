import express from 'express'
import connectToDB from './utils/db.js';
import cors from 'cors'
import "dotenv/config"
import cookieParser from "cookie-parser";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

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

app.get("/", (req, res)=>{
    res.send("Hello World")
})

const PORT=process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`)
    connectToDB()
})