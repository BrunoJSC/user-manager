import {Request, Response} from "express";
import {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken";
import {generateToken} from "../../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            // Geração de token após validação bem-sucedida de senha
            const token = generateToken({ id: user.id, email: user.email });
            return res.json({ token });
        } else {
            return res.status(401).json({ message: "Email ou senha inválido" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};


export const listUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error("Failed to retrieve users:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        console.log("Verificação de usuário existente concluída.");
        if (existingUser) {
            return res.status(409).json({ message: "Email já registrado." });
        }
        console.log("Nenhum usuário existente com o mesmo email.");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Senha hashada com sucesso.");
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        console.log("Usuário criado com sucesso.");
        const token = generateToken({ id: newUser.id, email: newUser.email });
        console.log("Token gerado com sucesso.");
        res.status(201).json({ token });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Erro ao criar usuário." });
    }
};



export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send({error: "User not found"});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    await prisma.user.delete({
        where: {
            id
        }
    });

    res.status(200).send();
}