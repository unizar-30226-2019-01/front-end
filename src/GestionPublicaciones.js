import axios from 'axios'


export const getProductos = () => {
    return axios
        .get('productos', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id])
            })
  
            return data
        })
  }
  