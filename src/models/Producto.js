import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre : { type: String, required: true},
    precio : { type: Number, required: true},
    stock: { type: Number, required: true},
    categoria: { type: Number, required: true},
    fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model("Producto", productoSchema);