import express from 'express';
import {loginValidator, registerValidator} from "../validators/auth.validator.js"
import { getMe, login, refresh, register } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/register" , registerValidator,  register );
router.post("/login" , loginValidator, login)
router.post("/refresh" , refresh)
router.get("/me" , authenticate ,getMe)

export default router;