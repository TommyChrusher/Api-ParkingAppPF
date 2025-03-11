import { Pool } from "../config/db_conection.js";

////Listar sedes
const obtenerSedes = async (req,res) =>{
    try{
        const result = await Pool.query("SELECT * FROM sede");
        res
        .status(200)
        .json(result.rows)
    }catch (error){
        res.send(error)
    }
};
///Crear una nueva sede
const crearSede = async(req,res) =>{
    try{
        const body = req.body
        await Pool.query(`INSERT INTO sede (nombre,direccion) VALUES ('${body.nombre}','${body.direccion}')`);
        const result = await Pool.query(`SELECT * FROM sede WHERE direccion = '${body.direccion}' AND nombre = '${body.nombre}'`);
        res
        .status(200)
        .json(result.rows)
    }catch (error){
        res
        .status(500)
        .send(error)
    }
}

export default {
    obtenerSedes,
    crearSede
}