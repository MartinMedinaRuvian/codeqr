//USO MODULO QUE TRAE POR DEFECTO fs PARA EL MANEJO DE ARCHIVOS (CREACION, MODIFICACION, ELIMINACION, ETC)
const fs = require('fs');
//USO EL MODULO DE NPM qrcode EL CUAL SE ENCARGARA DE CREAR EL QR
const qrcode = require('qrcode');

//FUNCION PRINCIPAL PARA CREAR EL ARCHIVO QR
async function crearQR(texto_o_url, rutaGuardar){
    const qr = await qrcode.toDataURL(texto_o_url);
    const htmlContent = formatoHTML(qr, texto_o_url);
    crearArchivo(htmlContent, rutaGuardar);
}

//CREO EL FORMATO DE HTML QUE QUIERO MOSTRAR DONDE VOY A MOSTRAR EL QR EN UNA IMAGEN Y EL TEXTO EN UN PARRAFO
function formatoHTML(qr){
    return `
    <div>
    <h3>Código QR Generado</h3>
    <img src="${qr}">
    </div>
    `;
}

//CREO EL ARCHIVO index.html EN LA RAIZ DEL PROYECTO COMO PRIMER PARAMETRO LE PASO EL FORMATO DEL ARCHIVO Y COMO SEGUNDO PARAMETRO LA RUTA DONDE SE VA GUARDAR
function crearArchivo(htmlContent, rutaGuardar){
    fs.writeFileSync(rutaGuardar, htmlContent);
}

//EJECUTO LA FUNCION PRINCIPAL LA CUAL CREARA EL ARCHIVO 
crearQR('https://martinmedinaruvian.github.io/index/', './test.html');
