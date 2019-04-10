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
                data.push([val.Nombre, val.id, val.Descripcion, val.vendedor])
            })
  
            return data
        })
  }
  