import axios from 'axios'


export const getProductos = () => {
    return axios
        .get('listarVentas', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria])
            })
  
            return data
        })
  }
  
  export const anadirProducto = newProducto => {
    return axios
      .post('crearVenta', {
        nombre: newProducto.nombre,
        fecha: newProducto.fecha,
        categoria: newProducto.categoria,
        descripcion: newProducto.descripcion,
        foto: newProducto.foto,
        precio: newProducto.precio,
        vendedor: newProducto.vendedor

      })
      .then(res => {
        console.log(res)
        return res.data
      })
  }

  export const actualizarProducto= (idP, producto) => {
    axios
        .post(`modificarVenta/${idP}`, {
            nombre: producto.nombre,
            fecha: producto.fecha,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            foto: producto.foto,
            precio: producto.precio
        })
        .then(response => {
          return response.data
        })
        .catch(err => {
          console.log(err)
        })
  }

  export const eliminarProducto = producto => {
    axios
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
