import { Pool } from "../config/db_conection.js";

////CrearEspacio
const crearEspacio = async (req, res) => {
    try {
        const body = req.body
        console.log(`${body.id_sede},'${body.codigo}','${body.estado}','${body.tipo}`)
        await Pool.query(`INSERT INTO espacio_parqueo (id_sede,codigo,estado,tipo) VALUES (${body.id_sede},'${body.codigo}','${body.estado}','${body.tipo}')`);
        const result = await Pool.query(`SELECT * FROM espacio_parqueo WHERE codigo = '${body.codigo}' AND id_sede = ${body.id_sede}`);
        res
            .status(200)
            .json(result.rows)
    } catch (error) {
        res
            .status(500)
            .send(error)
    }
}

///Asignar_Espacio
const Asignar_Espacio = async (req, res) => {
    try {
        const body = req.body
        const search = await Pool.query(`SELECT * FROM espacio_parqueo WHERE id_sede = ${body.id_sede} AND tipo ='${body.tipo}' AND estado = 'disponible'`);
        if (search.rowCount === 0) {
            res
                .status(200)
                .send("No se encontraron espacios disponibles")
                console.log("Espacio no disponible")
        }else{
            console.log("Espacio disponible")
        const date= new Date()
        const busquedaVehiculo = await Pool.query(`SELECT * FROM vehiculo WHERE placa = '${body.placa}'`);
        if (busquedaVehiculo.rowCount === 0) {
            await Pool.query(`INSERT INTO vehiculo (placa,tipo) VALUES ('${body.placa}','${body.tipo}')`);
            console.log("vehiculo creado")
        } else {
            const busquedaAsignacion = await Pool.query(`SELECT * FROM asignacion WHERE placa = '${body.placa}' 
                AND DATE(fecha_registro) = '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'`);
            console.log('Busqueda de reservas')
            if(busquedaAsignacion.rowCount != 0){
                res
                    .status(200)
                    .send("El vehiculo ya tiene una reserva asignada")
                    
            } else {
                const espacioSelected = search.rows[0]
            console.log("espacio encontrado")
            await Pool.query(`INSERT INTO asignacion (id_espacio,placa) VALUES (${espacioSelected.id},'${body.placa}')`)
            console.log("asignacion creada")
            await Pool.query(`UPDATE espacio_parqueo set estado = 'ocupado' WHERE id = ${espacioSelected.id}`)
            const result = await Pool.query(`
                SELECT asignacion.*, espacio_parqueo.codigo, espacio_parqueo.tipo, sede.nombre, sede.direccion
                FROM asignacion 
                INNER JOIN espacio_parqueo ON asignacion.id_espacio = espacio_parqueo.id 
                INNER JOIN sede ON espacio_parqueo.id_sede = sede.id
                WHERE placa ='${body.placa}' AND id_espacio = ${espacioSelected.id}`)
            res
                .status(200)
                .json(result.rows)
            }
            
        }
        
        }
        
    } catch (error) {
        res
            .status(500)
            .send(error)
    }
}

const reiniciarEspacio= async (req,res) =>{
    try{
      await Pool.query(`UPDATE espacio_parqueo SET estado='disponible'`)  
      res
      .status(200)
    } catch (error) {
        res
        .status(500)
        .send(error)
    }
}   

export default {
    crearEspacio,
    Asignar_Espacio,
    reiniciarEspacio
}