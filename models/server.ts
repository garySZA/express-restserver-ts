import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { userRouter } from '../routes';
import db from '../db/connection';
import { RoutesType } from '../types';

class Server {

    private app: Application;
    private port: string;
    private baseUrl: string;
    private apiPaths: RoutesType;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '7997';
        this.baseUrl = process.env.BASE_URL || '/api/v1';
        this.apiPaths = {
            users: `${ this.baseUrl }/users`
        }

        //* DB Connection
        this.dbConnection();
        
        //* Middlewares: 
        this.middlewares();

        //* Definiendo rutas
        this.routes();

    }

    async dbConnection() {
        try {

            await db.authenticate();

            console.log('Database online');
            
        } catch (error: any) {
            throw new Error( error );
        }
    }

    middlewares() {
        //* Morgan
        this.app.use( morgan( 'dev' ) );

        //* Cors
        this.app.use( cors() );

        //* Lectura de body
        this.app.use( express.json() );

        //* Carpeta pública
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.apiPaths.users, userRouter );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${ this.port }`);
        });
    }

}

export default Server;