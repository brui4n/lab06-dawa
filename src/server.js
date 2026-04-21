import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import productoRouter from "./routes/productoRoutes.js";

dotenv.config();

const app = express();

conectarDB();

// middlewares

app.use(express.json());

// rutas

app.use("/api/productos", productoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
