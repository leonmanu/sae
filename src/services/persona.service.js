const req = require('express/lib/request')
const { head } = require('request')
const personaSheet =  require("../sheets/persona.sheet")

const getPersona = async () => { //este trae de la hoja estudiantes
    registros = await personaSheet.getTodo()
    return registros
}

async function post(objeto){
    const registro =  await personaSheet.post(objeto)
    console.log("personaService post -> " + registro.id)
    return registro
} 



module.exports = {
    getPersona:getPersona,
    postPersona: post
} 