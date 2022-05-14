import { Backdrop, Box, Button, Fade, makeStyles, Modal, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { useMutation } from 'react-query'
import { postOne } from './apiservices'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  box:{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '50%',
    height: '50%',
    borderRadius: '10px',
    justifyContent: 'center',
  },

  textField:{
    margin: theme.spacing(2),
  },

  btn:{
    margin: theme.spacing(2),
  }

} ))

export const ModalCreate = ({setIsOpen, isOpen, refetch}) => {
    const classes = useStyles()
    const {mutate, data, isError} = useMutation(postOne)

    const formik = useFormik({
      initialValues: {
        nombre: '',
        email: '',
        password: ''
      }
    });


    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    const handlePost = (e)=>{
      e.preventDefault()
        mutate(formik.values)
        formik.resetForm()
        refetch()
    }
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box className={classes.box}>
          <TextField type="text" className={classes.textField}  name='nombre' label="Nombre de usuario" onChange={formik.handleChange} value={formik.values.nombre} />
          <TextField  type="email" className={classes.textField} name='email'label="Email" onChange={formik.handleChange} value={formik.values.email} />
          <TextField  type="password" className={classes.textField} name='password'label="Password" onChange={formik.handleChange} value={formik.values.password} />
          <Button variant="contained" className={classes.btn} color="primary" onClick={handlePost}>Enviar</Button>
          </Box>
        </Fade>
      </Modal>
  )
}
