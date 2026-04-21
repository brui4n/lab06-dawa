import { Router } from "express";
import {
    obtenerProductos,
    obtenerProducto,
    obtenerProductosPorCategoria,
    buscarProductoPorNombre,
    crearProducto,
    editarProducto,
    eliminarProducto
} from "../controllers/productoController.js";

const router = Router();


router.get("/", obtenerProductos);
router.get("/categoria", obtenerProductosPorCategoria);
router.get("/buscar", buscarProductoPorNombre);
router.get("/:id", obtenerProducto);
router.post("/", crearProducto);
router.put("/:id", editarProducto);
router.delete("/:id", eliminarProducto);

export default router;