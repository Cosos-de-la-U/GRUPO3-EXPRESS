import {Request,Response} from 'express';
import usuario from '../models/usuario.schema';


export const  getAll = async (req : Request, res : Response) => {
    try {
        const usuarios = await usuario.find()

        //manejo de errores
        if (!usuarios) {
            return res.status(404).send({ ok: false, msg: 'No hay usuarios' })
        }
        return res.status(200).json({ ok: true, usuarios })


    } catch (error) {
        return res.status(500).send({ ok: false, msg: 'ocurrió error' })

    }
}

export const create = (req : Request, res : Response) => {
    
    try {
        const newUsuario = new usuario(req.body)
        
        if (!newUsuario) {
            return res.status(404).send({ ok: false, msg: 'No se creó el usuario' })
        }
        newUsuario.save()
        res.status(200).json({ ok: true, newUsuario })
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'ocurrió error' })
    }
}
export const getOne = async (req: Request, res: Response) => {
    const { nombre } = req.params

    try {
        const foundUser = await usuario.findOne({ nombre })

        if (!foundUser) {
            return res.status(404).send({ ok: false, msg: `No se encontró el usuario con el nombre ${nombre} ` })
        }

        return res.status(200).json({ ok: true, foundUser })

    } catch (error) {
        return res.status(500).send({ ok: false, msg: 'ocurrió error' })
    }
}



export const update = async (req : Request, res : Response) => {
    const { nombre } = req.params
    const { email, password} = req.body

    try {
        const updatedUser = await usuario.findOneAndUpdate({nombre},{email,password},{new:true})

        if (!updatedUser) {
            return res.status(404).send({ ok: false, msg: 'No se actualizó el usuario, por que no existe' })
        }

        return res.status(200).json({ ok: true, updatedUser })

    } catch (error) {
        return res.status(500).send({ ok: false, msg: 'ocurrió error' })
    }

}

export const deleteOne = async (req : Request, res : Response) => {

    const { nombre } = req.params

    try {
        const deletedUser = await usuario.findOneAndDelete({ nombre })

        if (!deletedUser) {
            return res.status(404).send({ ok: false, msg: 'No se eliminó el usuario, por que no existe' })
        }

        return res.status(200).json({ ok: true, deletedUser })

    } catch (error) {
        return res.status(500).send({ ok: false, msg: 'ocurrió error' })
    }

}


