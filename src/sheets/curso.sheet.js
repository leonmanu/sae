const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[580461766]
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
    
}

async function getTodos(){//hay que borrar
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
    
}

// async function getOne(){
//     const documento = await obtenercredenciales()

//     const sheet = documento.sheetsById[82786429]
//     const registros =  await sheet.getRows()
//     //const resultados = registros.filter(row => row ['Estudiante'] === 'ALBARRACÍN, Guadalupe')
//     // registros.map((registro)=>{

//     // })
//     console.log(registros)

//     return registros
    
// }

// async function post(pObjeto) {
//     const documento = await obtenercredenciales()

//     const sheet = documento.sheetsById[82786429]
//     await sheet.addRow(pObjeto)

//     console.log(pObjeto)
// }

// async function put(pObjeto) {
//     const documento = await obtenercredenciales()
    
//     const sheet = documento.sheetsById[82786429]
//     const rows = await sheet.getRows()

//     console.log('lenght: ', rows.length)

//     rows[5].Estudiante = 'Sergio el Bailador'
//     await rows[5].save()

//     for (let index = 0; index < rows.length; index++) {
//         const element = rows[index].Estudiante;
//         console.log('Registro: ', element)
//     }

// }

// async function del(pObjeto) {
//     const documento = await obtenercredenciales()

//     const sheet = documento.sheetsById[82786429]
//     await sheet.addRow(pObjeto)

//     console.log(pObjeto)
// }

module.exports = {
    get:get,
    getTodos: getTodos,
    // getOne: getOne,
    // post: post,
    // put : put,
    // del : del
}