import axios from 'axios'

export const register = newUser => {
  return axios
  
    .post('register', {
      login: newUser.login,
      password: newUser.password,
      nombre: newUser.nombre,
      apellidos: newUser.apellidos,
      email: newUser.email,
      foto: newUser.foto,
      telefono: newUser.telefono
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
}

export const login = user => {
  return axios
    .post('login', {
      login: user.login,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const actualizarInfo = user => {
  axios
      .post(`updateUsuario`, {
        login: user.login,
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono,
        email: user.email,
        foto: user.foto
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
}


export const deleteUser = user => {
  return axios
      .post(`delete`, {
            login: user.login,
      })
      .then((res) => {
        console.log(res)
        localStorage.removeItem('usertoken')
      })
      .catch(err => {
        console.log(err)
      })
}

export const infoUsuario = login => {
  return axios
      .get(`infoUsuario/${login}`, {

      })
      .then(res => {
        var data = []
        data[0]=res.data.Login
        data[1]=res.data.Nombre
        data[2]=res.data.Apellidos
        data[3]=res.data.Email
        data[4]=res.data.Foto
        data[5]=res.data.Password
        data[6]=res.data.Puntuacion
        data[7]=res.data.Telefono
        return data
    })
}
