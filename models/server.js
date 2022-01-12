const express = require('express')
const cors = require('cors');
const { dbConexion } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuario'

        //Conectar a base de datos
        this.conectarDB();

        //Lectura y parseo del body
        this.app.use(express.json());

        // Middlewares
        this.middlewares();
        
        // Rutas de mi Aplicación
        this.routes();
    }

    async conectarDB(){
         await dbConexion();
    }


    middlewares(){
        // Cors
        this.app.use(cors());
        
        // Directorio público
        this.app.use(express.static('public'));
    }
    
    routes() {
        this.app.use(this.usuarioPath, require('../routes/usuario'));
    }

    listen() {
        this.app.listen(this.port,() => {
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
    
}

module.exports = Server;