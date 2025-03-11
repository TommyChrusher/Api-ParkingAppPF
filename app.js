///importamos los recursos que necesitamos
import express from 'express';
import dotenv from 'dotenv';
import sede_controller from './controllers/sede_controller.js';
import espacio_parqueo_controller from './controllers/espacio_parqueo_controller.js';

dotenv.config()
///Iniciamos nuestra app
const app = express();
///Middleware para interpretar el body de la petición como JSON
app.use(express.json());
////definición de rutas para sedes
app.get("/sedes", sede_controller.obtenerSedes);
app.post("/sedes", sede_controller.crearSede);
///definición de rutas para espacio
app.post("/espacio_parqueo",espacio_parqueo_controller.crearEspacio);
app.post("/asignar_espacio",espacio_parqueo_controller.Asignar_Espacio);
///ruta para reiniciar parqueadero
app.post("/reiniciar_espacios",espacio_parqueo_controller.reiniciarEspacio)

///Inicializamos nuetsro servidor
const PORT = process.env.APP_PORT
app.listen(PORT, ()=>{
    console.log(`Servidor inicializado en el puerto ${PORT}`)
})