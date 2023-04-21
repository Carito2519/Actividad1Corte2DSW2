const express = require('express');
const { v4: uudiv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

app = express();
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/contenido', (request, response) => {
    const { id, nombre, apellido, titulo, autor, editorial, año } =
        request.body;
    if (
        id.length == 0 ||
        nombre.length == 0 ||
        apellido.length == 0 ||
        titulo.length == 0 ||
        autor.length == 0 ||
        editorial.length == 0 ||
        año.length == 0
    ) {
        return response.redirect('/static/error.html');
    }

    const rutaArchivo = `data/${id}_${uudiv4()}.txt`;
    const data = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;
    fs.writeFileSync(rutaArchivo, data);
    response.download(rutaArchivo, {
        root: path.join(__dirname),
    });
});

app.listen(5000);
console.log('Escuchando en el puerto 5000: http://localhost:5000');
