const express = require('express')

const app = extpress()
const PORT = 8080

app.listen(PORT, (error)=>{
    if(error) console.log('Error en el server', error)
    console.log('Servidor corriendo en el puerto', PORT);
})