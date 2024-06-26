const req = require('express/lib/request')
const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[483612079]
    return documento
}

async function get(){
    await obtenercredenciales()
    
    const registros =  await sheet.getRows()
    //console.log("Cargo por docente::::::::::::.. ", registros)
    return registros
}

async function postDocenteCargo(objetoInterface) {
    console.log("postDocenteCargo: Antes: ", objetoInterface)
    await obtenercredenciales()

    const objetoSalvado = await sheet.addRow(objetoInterface)
    //console.log("postDocenteCargo: Después: ", objetoSalvado)
    return objetoSalvado
}

async function putBajaDocenteCargo(rowNumber, fechaBaja) {
    console.log(fechaBaja, "postDocenteCargo: Antes: ", rowNumber)
    const index = rowNumber - 2
    const registros = await sheet.getRows()
    registros[index].fechaBaja = fechaBaja
    await registros[index].save()
    
    console.log("postDocenteCargo: Después: ", registros[index].asignatura)
    //console.log('lenght: ', registros.length)
    return rowNumber
}

module.exports = {
    get:get,
    postDocenteCargo:postDocenteCargo,
    putBajaDocenteCargo: putBajaDocenteCargo
}