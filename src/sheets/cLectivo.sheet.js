const req = require('express/lib/request')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[434438993]
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()

    return registros
}

async function getUltimo(){
    const registros =  await get()
    const indice = registros.length
    const resultado = registros[indice - 1]

    return resultado
}

module.exports = {
    get,
    getUltimo
}