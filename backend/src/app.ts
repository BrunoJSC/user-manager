import express from "express";
import userRoutes from "./api/routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import {authenticateToken} from "./middlewares/authenticate";
import 'dotenv/config';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Authorization"
}));


app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});