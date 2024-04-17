import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user: { id: string; email: string }) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }  // O token expira em 1 hora
    );
};

