import mongoose from "mongoose";
import "dotenv/config";

const conectar = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ Conexion exitosa a MongoDB: ${mongoose.connection.host}`);
        console.log(`📦 Base de datos: ${mongoose.connection.name}`);
    } catch (error) {
        console.log(`Error al intentar conectar con la base de datos: ${error}`);
    }
}

export default conectar;
