const req = require('express/lib/request')

const turnoSheet = require('../sheets/cLectivo.sheet')

const get = async () => {
    registros = await turnoSheet.get()
    return registros
}

const getUltimo = async () => {
    registros = await turnoSheet.get()
    return registros
}

module.exports = {
    get,
} 