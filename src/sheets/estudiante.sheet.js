const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)

let documento = new GoogleSpreadsheet(process.env.SHEET_URI)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[0]
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()

    return registros
}

async function getEstudianteCurso(){
    const documento = await obtenercredenciales()
    sheet = documento.sheetsById[1585615507] // acá usé la query ordenada: EstudianteCurso_get
    const registros =  await sheet.getRows()

    return registros
}

async function getTodoPorCurso(){
    const documento = await obtenercredenciales()
    sheet = documento.sheetsById[1585615507] // acá usé la query ordenada: EstudianteCurso_get
    const registros =  await sheet.getRows()

    return registros
}

async function getPorCurso(){
    const documento = await obtenercredenciales()
    sheet = documento.sheetsById[1287324365] // acá usé la query ordenada: EstudianteCurso
    const registros =  await sheet.getRows()
 
    return registros
}

async function post(objeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[0]
    await sheet.addRow(objeto)
    console.log("se creó nuevo ",objeto)
    return objeto
    
}

async function put(cargo) {
    const documento = await obtenercredenciales()
    
    const sheet = documento.sheetsById[82786429]
    const rows = await sheet.getRows()

    //console.log('lenght: ', rows.length)

    rows[5].Estudiante = 'Sergio el Bailador'
    await rows[5].save()

    for (let index = 0; index < rows.length; index++) {
        const element = rows[index].Estudiante;
        //console.log('Registro: ', element)
    }

}

async function del(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet.

    console.log(pObjeto)
}

module.exports = {
    get,
    getTodoPorCurso: getTodoPorCurso,
    getEstudianteCurso:getEstudianteCurso,
    getPorCurso:getPorCurso,
    post: post,
    put : put,
    del : del
}