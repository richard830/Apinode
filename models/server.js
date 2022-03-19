

const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.middlewares();


        this.routes();
    }


    middlewares() {

        //CORS
        this.app.use( cors());

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