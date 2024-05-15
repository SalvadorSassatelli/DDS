import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbInit from "./data/db-init.js";
import SucursalServices from "./services/sucursal_services.js";


dotenv.config();

const app = express();

app.use(cors());

app.get("/status", (req, res) => {
    res.json({ respuesta: "API iniciada y escuchando..." });
});

app.get('/api/locales', SucursalServices.getStoresByArgentinaCountry);

app.get('/api/locales/interior', SucursalServices.getStoresByArgentinaCountryAndNotAMBA);

(async function start() {
    const PORT = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    await dbInit();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}());
