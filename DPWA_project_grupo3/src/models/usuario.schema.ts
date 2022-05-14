import {Schema, model} from 'mongoose'

interface IUsuario{
    nombre: string;
    email: string;
    password: string;
}
const UsusarioSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},  
    password: {type: String, required: true},
});

const Usuario = model<IUsuario>('Usuario', UsusarioSchema);
export default Usuario