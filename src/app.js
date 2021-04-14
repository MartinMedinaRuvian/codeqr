//USO EL MODULO DE NPM qrcode EL CUAL SE ENCARGARA DE CREAR EL QR
const qrcode = require('qrcode');
//USO MODULO EXPRESS
const express = require('express');
//USO MODULO PATH PARA OBTERNER RUTAS DE LAS CARPETAS DE UNA FORMA RAPIDA
const path = require('path');

const app = express();

//CONFIG MIDELLWARES
app.use(express.urlencoded({extended:false}));

//CONFIG ROUTERS
app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/create", async (req, res) => {
    let text = req.body.text;
    let qr = await createQR(text);
    res.render("create.ejs", { text, qr });
})

//CONFIG DAFAULTS VIEWS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

//FUNCTION FOR CREATE QR
async function createQR(text_or_url) {
    const qr = await qrcode.toDataURL(text_or_url);
    return qr;
}

//CONFIG PORT WHERE RUN SERVER
app.set('port', 5000);
let puerto = app.get('port');

app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto ', puerto);
});