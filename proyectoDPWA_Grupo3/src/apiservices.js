const baseURL = 'http://localhost:4000/api/usuarios'

export const getAll = async () => {
  const data = await fetch(baseURL)
    const usuarios = await data.json()
  return usuarios
}

export const getOne = async (nombre) => {
    const res = await fetch(`${baseURL}/${nombre}`)
    const usuario = await res.json()
    
    return usuario
}


export const deleteOne = async (nombre) => {
    const res = await fetch(`${baseURL}/${nombre}`, {
        method: 'DELETE'
    })
    const usuario = await res.json()
    return usuario

}

export const postOne = async (payload) =>{
 
    const newUser = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await newUser.json()
    return data

}

export const updateOne = async (payload) => {
    const res = await fetch(`${baseURL}/${payload.nombre}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()
    return data
}