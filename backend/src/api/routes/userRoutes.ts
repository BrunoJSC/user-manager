import {Router} from "express";
import {createUser, deleteUser, getUser, listUsers, loginUser} from "../controllers/userController";
import {authenticateToken} from "../../middlewares/authenticate";

const router = Router();

// Rota para login
router.post("/login", loginUser);

// Rota para listar todos os usuários
router.get("/users", authenticateToken, listUsers);

// Rota para criar usuários
router.post("/users", createUser);

// Rota para buscar usuários pelo ID
router.get("/users/:id", authenticateToken, getUser);

// Rota para deletar usuário pelo ID
router.delete("/users/:id", authenticateToken, deleteUser);

export default router;