import axios from 'axios'


export const getProductos = () => {
    return axios
        .get('listarEnVenta', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                //var fotos = getFotos(val.id)



                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })
            //console.log(data)
            return data
        })
  }

  export const getSubastas = () => {
      return axios
          .get('listarSubastas', {
              headers: { "Content-type": "application/json" }
          })
          .then(res => {
              var data = []
              Object.keys(res.data).forEach((key) => {
                  var val = res.data[key]
                  data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia, val.Puntuacion])
              })

              return data
          })
    }

  export const getEnVentaUsuario = (usuario) => {

    return axios
        .get(`listarEnVentaDeUsuario/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }

  export const getVentasAcabadas = (usuario) => {
    return axios
        .get(`listarVentasAcabadas/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }

  export const getSubastasEnCurso = (usuario) => {
    return axios
        .get(`listarSubastasDeUsuario/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }

  export const getSubastasAcabadas = (usuario) => {
    return axios
        .get(`listarSubastasAcabadas/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }

  export const getProductosComprados = (usuario) => {
    return axios
        .get(`listarProductosComprados/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Categoria, val.FotoPrincipal])
            })

            return data
        })
    }



  export const getProductosMayorMenor = () => {
      return axios
          .get('listarVentasMayorMenor', {
              headers: { "Content-type": "application/json" }
          })
          .then(res => {
              var data = []
              Object.keys(res.data).forEach((key) => {
                  var val = res.data[key]
                  data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia, val.Puntuacion])
              })

              return data
          })
    }

    export const getProductosMenorMayor = () => {
        return axios
            .get('listarVentasMenorMayor', {
                headers: { "Content-type": "application/json" }
            })
            .then(res => {
                var data = []
                Object.keys(res.data).forEach((key) => {
                    var val = res.data[key]
                    data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia, val.Puntuacion])
                })

                return data
            })
      }


export const getSubastasMayorMenor = () => {
    return axios
        .get('listarSubastasMayorMenor', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }

export const getSubastasMenorMayor = () => {
    return axios
        .get('listarSubastasMenorMayor', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }


export const anadirProducto = newProducto => {
  return axios.post('crearVenta', {
      headers: { "Content-type": "application/json" },
      nombre: newProducto.nombre,
      fecha: newProducto.fecha,
      categoria: newProducto.categoria,
      descripcion: newProducto.descripcion,
      precio: newProducto.precio,
      vendedor: newProducto.vendedor,
      fotoPrincipal: newProducto.foto,
      foto1: newProducto.foto1,
      foto2: newProducto.foto2,
      foto3: newProducto.foto3,
      provincia: newProducto.provincia
    })
    .then(res => {
        return res.data
    }).catch(err => {
      return err})
}

export const estaValorado = (producto, valoracion) => {

    return axios.post(`estaValorado/${producto}`, {
        headers: { "Content-type": "application/json" },
      })
      .then(res => {
          return res.data
      }).catch(err => {
        return err})
  }

export const valorarProducto = (producto, valoracion) => {
    console.log("ENTRA valorar producto FRONT, parametros:")
    console.log(producto)
    console.log(valoracion)

    return axios.post(`calcularValoracion/${producto}/${valoracion}`, {
        headers: { "Content-type": "application/json" },
      })
      .then(res => {
          return res.data
      }).catch(err => {
        return err})
  }


export const anadirSubasta = newProductoSubasta => {
  return axios.post('crearSubasta', {
      nombre: newProductoSubasta.nombre,
      fecha: newProductoSubasta.fecha,
      categoria: newProductoSubasta.categoria,
      descripcion: newProductoSubasta.descripcion,
      fotoPrincipal: newProductoSubasta.foto,
      foto1: newProductoSubasta.foto1,
      foto2: newProductoSubasta.foto2,
      foto3: newProductoSubasta.foto3,
      precio: newProductoSubasta.precio,
      vendedor: newProductoSubasta.vendedor,
      fechaLimite: newProductoSubasta.fechaLimite,
      horaLimite: newProductoSubasta.horaLimite,
      provincia: newProductoSubasta.provincia
    }).then(res => {
      return res.data
    }).catch(err => {
      return err})
}

export const tipoProducto = id => {
    return axios
        .get(`obtenerTipoProducto/${id}`, {

        })
        .then(res => {
          return res.data
      })
  }

export const infoVenta = id => {
    return axios
        .get(`obtenerDatosVenta/${id}`, {

        })
        .then(res => {
          var data = []
          data[0]=res.data.id
          data[1]=res.data.Nombre
          data[2]=res.data.Descripcion
          data[3]=res.data.Categoria
          data[4]=res.data.FotoPrincipal
          data[5]=res.data.Vendedor
          data[6]=res.data.Precio
          return data
      })
  }

export const infoSubasta = id => {
    return axios
        .get(`obtenerDatosSubasta/${id}`, {

        })
        .then(res => {
            console.log(res.data.id)
            var data = []
            data[0]=res.data.id
            data[1]=res.data.Nombre
            data[2]=res.data.Descripcion
            data[3]=res.data.Categoria
            data[4]=res.data.FotoPrincipal
            data[5]=res.data.Vendedor
            data[6]=res.data.precio_salida
            data[7]=res.data.precio_actual
            data[8]=res.data.fecha_limite
            data[9]=res.data.hora_limite
            return data
        })
}


export const getFotos = id => {
    return axios
        .get(`obtenerFotos/${id}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.foto])
            })
            return data
        })
  }

export const actualizarProducto = productoEditado => {
  return axios
      .post('modificarVenta', {
          idP: productoEditado.id,
          nombre: productoEditado.nombre,
          descripcion: productoEditado.descripcion,
          categoria: productoEditado.categoria,
          fotoP: productoEditado.fotoP,
          foto1: productoEditado.foto1,
          foto2: productoEditado.foto2,
          foto3: productoEditado.foto3,
          fotoPAntigua: productoEditado.fotoPAntigua,
          foto1Antigua: productoEditado.foto1Antigua,
          foto2Antigua: productoEditado.foto2Antigua,
          foto3Antigua: productoEditado.foto3Antigua,
          precio: productoEditado.precio,
          fecha: productoEditado.fecha
      })
      .then(res => {
          return res.data
      }).catch(err => {
        return err})
}

export const actualizarSubasta = subastaEditada => {
  return axios
      .post('modificarSubasta', {
          idP: subastaEditada.id,
          nombre: subastaEditada.nombre,
          descripcion: subastaEditada.descripcion,
          categoria: subastaEditada.categoria,
          fotoP: subastaEditada.fotoP,
          foto1: subastaEditada.foto1,
          foto2: subastaEditada.foto2,
          foto3: subastaEditada.foto3,
          fotoPAntigua: subastaEditada.fotoPAntigua,
          foto1Antigua: subastaEditada.foto1Antigua,
          foto2Antigua: subastaEditada.foto2Antigua,
          foto3Antigua: subastaEditada.foto3Antigua,
          fecha: subastaEditada.fecha
      })
      .then(res => {
          return res.data
      }).catch(err => {
        return err})
}

export const eliminarProducto = producto => {
    return axios
      .post(
          `eliminarVenta/${producto}`, {
              headers: { "Content-type": "application/json" }
          })
      .then((res) => {
          console.log(res)
      })
      .catch((res) => {
          console.log(res)
      })
}

export const eliminarSubasta = subasta => {
    return axios
      .post(
          `eliminarSubasta/${subasta}`, {
              headers: { "Content-type": "application/json" }
          })
      .then((res) => {
          console.log(res)
      })
      .catch((res) => {
          console.log(res)
      })
}

  export const crearFavorito = (producto, id) => {
    return axios
        .post(
            `crearFavorito/${id}`, {
                usuario: producto.usuario
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const consultarFavorito = (producto, id) => {
    return axios
        .post(
            `esFavorito/${id}`, {
                usuario: producto.usuario
            })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
  }

  export const eliminarFavorito = (producto, id) => {
    return axios
        .post(
            `eliminarFavorito/${id}`, {
                usuario: producto.usuario
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const listarVentasFavoritos = (usuario) => {
    return axios
        .get(`listarVentasFavoritas/${usuario}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia, val.Puntuacion])
            })

            return data
        })
  }

  export const listarSubastasFavoritos = (usuario) => {
    return axios
        .get(`listarSubastasFavoritas/${usuario}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Puntuacion])
            })

            return data
        })
  }

  export const realizarOferta = (usuario, id, precio) => {
    return axios
        .post(
            `hacerOfertaVenta/${id}/${precio}`, {
                usuario: usuario
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const realizarOfertaSubasta = (usuario, id, precio) => {
    return axios
        .post(
            `hacerOfertaVentaSubasta/${id}/${precio}`, {
                usuario: usuario
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const listarOfertas = (id) => {
    return axios
        .get(`listarOfertas/${id}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.precio, val.usuario])
            })

            return data
        })
  }

  export const aceptarOferta = (usuario, id) => {
    return axios
        .post(
            `aceptarOfertaVenta/${id}`, {
                usuario: usuario
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const eliminarOferta = (usuario, id) => {
    return axios
        .post(
            `eliminarOfertaVenta/${id}`, {
                usuario: usuario
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const eliminarTodasOferta = (id) => {
    return axios
        .post(
            `eliminartodasOfertasVenta/${id}`, {
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }
