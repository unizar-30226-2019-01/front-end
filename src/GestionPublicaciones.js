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
                data.push([val.Nombre, val.id, val.Descripcion, val.vendedor, val.precio, val.categoria])
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

      })
      .then(res => {
        console.log(res)
        return res.data
      })
  }