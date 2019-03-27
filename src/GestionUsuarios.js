import axios from 'axios'

export const register = newUser => {
  return axios
    .post('register', {
      login: newUser.login,
      password: newUser.password,
      nombre: newUser.nombre,
      apellidos: newUser.apellidos,
      email: newUser.email
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

export const getProfile = user => {
  return axios
    .get('profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
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
        biografia: user.biografia
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
  axios
      .post(`delete`, {
            login: user.login,
      })
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
}
