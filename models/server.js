

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/configdb');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        //coneccion de base de datos
        this.ConectarDB();


        this.middlewares();

        //rutas de mi apliccions
        this.routes();
    }

    async ConectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        // parsear a tipo json
        this.app.use(express.json());


        this.app.use(express.static('public'));
    }



    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }



    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el Port', this.port);
        });
    }
}



module.exports = Server;