import {Server} from './server'
import  './dbconfig';


const init = () => {
    const server = new Server()
    server.listen()
}

init()