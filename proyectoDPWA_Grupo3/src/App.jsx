import { Box, Button, Container, Fab, makeStyles, TextField, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import AddIcon from '@material-ui/icons/Add';
import { getAll, getOne } from "./apiservices"
import { UsuarioCard } from "./UsuarioCard"
import { ModalCreate } from "./ModalCreate";

const useStyles = makeStyles((theme) => ({
 
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  container: {
    marginTop:  theme.spacing(10 ),
  }

} ))



function App() {
  const classes = useStyles()
  const [filtrado, setFiltrado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const {data, isError, isLoading, refetch}= useQuery(['usuarios'], getAll)

const handleClose = () => {
  setIsOpen(!isOpen);
}
  const formik = useFormik({
    initialValues: {
      nombre: ''
    }
  });



  
  const handleFilter = async () =>{
    const usuarioFiltrado = await getOne(formik.values.nombre)
    setFiltrado(usuarioFiltrado)
    console.log(filtrado)
  }
  
  return (
    <Box className={classes.root}>

      <Container maxWidth='md' className={classes.container}>
        <Typography variant="h6" component="h1">
          Listado de usuarios
        </Typography>

        {
          isLoading && <p>Cargando...</p>
        }

        {
          isError && <p>Error</p>
        }
        {
          data && data.usuarios.map((usuario) => (
            <UsuarioCard usuario={usuario} refetch={refetch} />
          ))
        }
      </Container>



      <Container className={classes.container} maxWidth='md'>
        <Typography variant="h6" component="h1">
          Buscar Usuario
        </Typography>

        <TextField margin='dense' name="nombre" label="Buscar por nombre" onChange={formik.handleChange} value={formik.values.nombre} autoComplete='off' />
        <Button onClick={handleFilter} >Buscar</Button>

        {
          filtrado && <UsuarioCard usuario={filtrado?.foundUser} />
        }
      </Container>


      <Fab color="primary" aria-label="add" style={{ alignSelf: 'flex-end' }} onClick={ handleClose }>
        <AddIcon />
      </Fab>

      {
        isOpen && <ModalCreate refetch={refetch} setIsOpen={setIsOpen} isOpen={isOpen} />
      }
    </Box>

  )
}

export default App
