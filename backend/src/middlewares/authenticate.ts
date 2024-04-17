import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is required" });
    }

    const token = authHeader.split(' ')[1]; // Assegura que você está pegando a parte do token após 'Bearer '

    if (!token) {
        return res.status(401).json({ message: "Bearer token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};
