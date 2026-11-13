import express from "express";
import userRouter from "../routes/auth.routes.js"
import cookieParser from "cookie-parser"
import prodctRouter from "../routes/products.routes.js"
import cartsRoutes from "../routes/cart.routes.js"
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth" , userRouter)
app.use("/api/products" , prodctRouter)
app.use("/api/cart" , cartsRoutes)
export default app;