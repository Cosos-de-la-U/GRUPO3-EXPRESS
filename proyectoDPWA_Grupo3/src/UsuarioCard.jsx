import { Box, Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { deleteOne } from './apiservices'
import { ModalCreate } from './ModalCreate'
import { ModalUpdate } from './ModalUpdate'

const useStyles = makeStyles((theme) => ({

    root: {
        marginTop: theme.spacing(5),
    }

}))

export const UsuarioCard = ({usuario, refetch}) => {
    const classes = useStyles()
    
    const [isOpenUpdate, setIsopenUpdate] = useState(false);



    const handleDelete = async () => {
     await deleteOne(usuario?.nombre)
     refetch()

    }

    return (
        <Card className={classes.root} >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Nombre: {usuario?.nombre}
                </Typography>
                <Typography color="textSecondary" >
                    Email: {usuario?.email}
                </Typography>
                <Typography color="textSecondary">
                    Password: {usuario?.password}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={ ()=>  setIsopenUpdate(!isOpenUpdate)}>Actualizar</Button>
                <Button size="small" onClick={handleDelete}>Eliminar</Button>
            </CardActions>

            {
                isOpenUpdate && <ModalUpdate setIsOpen={setIsopenUpdate} isOpen={isOpenUpdate} usuario={usuario} refetch={refetch}/>
            }

           
        </Card>
    )
}
