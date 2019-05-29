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
      //puntuacion: 2.5   //Inicializamos a 2.5 estrellas
    })
    .then(response => {
      if(response.data != "Error"){
        console.log("token")
        localStorage.setItem('usertoken', response.data)
      }
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
      if(response.data != "Error"){
        console.log("token")
        localStorage.setItem('usertoken', response.data)
      }
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

//Elimina al usuario y los productos que tenga en venta
export const deleteUser = user => {

  return axios
      .post(`delete`, {
            login: user.login,
      })
      .then((res) => {
        //console.log(res)
        localStorage.removeItem('usertoken')
      })
      .catch(err => {
        console.log(err)
      })
}

export const tieneSubastas = user => {

  return axios
      .post(`tieneSub`, {
            login: user.login
      })
      .then((res) => {
        return res.data
        //localStorage.removeItem('usertoken')
      })
      .catch(err => {
        console.log(err)
      })
}

export const infoUsuario = login => {
  return axios

      .post('infoUsuario', {
        usuario: login
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

        //console.log("DEVUELVE infousuario")
        //console.log(data)

        return data
    })
}

export const reportar = infoReport => {
  return axios

    .post(`reportar/${infoReport.producto}`, {    //pasar el id del producto por parametro xq sino falla
      denunciante: infoReport.denunciante,
      vendedor: infoReport.vendedor,
      //tipoDenuncia: infoReport.tipoDenuncia,
      texto: infoReport.texto,
    })
    .then(response => {
      if(response.data != "Error"){
        console.log("token")
        //localStorage.setItem('usertoken', response.data)
      }
      return response.data
    })
}
