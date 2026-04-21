import Producto from "../models/Producto.js";


// Crear

export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria } = req.body;
        
        // Validacion de campos completados
        if (!nombre || !precio || !stock || !categoria) {
            return res.status(400).json({
                ok: false,
                mensaje: "Todos los campos son obligatorios"
            })
        }

        const producto = await Producto.create(req.body);

        return res.status(201).json({
            ok: true,
            data: producto
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            mensaje: error.message
        })
    }
}

// Listar todos los productos (paginacion)

export const obtenerProductos = async (req, res) => {
    try {
        const { page = 1, limit = 10} = req.query;

        const productos = await Producto.find()
        .skip((page - 1) * limit)
        .sort({ precio: -1 }) // Ordenamos de forma descendente por precio
        .limit(Number(limit));

        return res.status(200).json({
            ok: true,
            data: productos
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            mensaje: error.message
        })
    }
}

// Listar todos los productos por cateogira 

export const obtenerProductosPorCategoria = async (req, res) => {
    try {

        if (!Number(req.query.categoria)) {
            
            return res.status(400).json({
                ok: false,
                mensaje: "Debe enviar el numero de categoria del producto"
            })
        }

        const productos = await Producto.find({
            categoria: Number(req.query.categoria)
        });

        return res.status(200).json({
            ok: true,
            data: productos
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            mensaje: error.mensage
        })
    }
}

// Buscar por ID

export const obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: producto
        });

    } catch(error) {
        return res.status(400).json({
            ok: false,
            mensaje: "ID inválido"
        });
    }
}

// Buscar por nombre

export const buscarProductoPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query;

        if (!nombre) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe enviar el parámetro 'nombre'"
            });
        }

        // Búsqueda insensible a mayúsculas/minúsculas
        const productos = await Producto.find({
            nombre: { $regex: nombre, $options: "i" }
        });

        if (productos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: `No se encontraron productos con nombre: ${nombre}`
            });
        }

        return res.status(200).json({
            ok: true,
            data: productos
        });

    } catch(error) {
        return res.status(400).json({
            ok: false,
            mensaje: error.message
        });
    }
}

// Editar un producto

export const editarProducto =  async (req, res) => {
    try {

        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!producto) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            ok: true,
            data: producto
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            mensaje: error.mensage
        })
    }
}

// Eliminar un producto

export const eliminarProducto = async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(400).json({
                ok: false,
                mensaje: "Debe enviar el id del producto"
            })
        }

        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            ok: true,
            data: producto
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            mensaje: error.message
        })
    }
}