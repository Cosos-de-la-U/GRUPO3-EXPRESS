import express, {Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import RutasUsuarios from './routes/usuarios.routes'



export class Server{
    app : Application = express();
    port  = process.env.PORT
    constructor(){
        this.settings()
        this.middlewares()
        this.routes()
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT)
        this.app.set("json spaces", 2)
    }

    listen(){
        this.app.listen(this.port)
        console.log(`Server running on port ${this.port}`)
    }

    
    middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }
    routes(){
        this.app.use('/api/usuarios', RutasUsuarios)
    }
}
