import { Router } from "express";
import { login, register } from "../controllers/users.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { userJoi } from "../models/user.model.js";

const router = Router();

router.post('/login', validateBody(userJoi.login), login);
router.post('/', validateBody(userJoi.register), register);

export default router;