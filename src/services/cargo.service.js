const req = require('express/lib/request')
const cargoSheet =  require("../sheets/cargo.sheet")

const get = async () => {
    const resultado = cargoSheet.get()
    return resultado
}

//Dedería llamarse getTodosPorCurso o algo de Asignaturas
const getTodos = async (req, res) => {
    console.log("PARAM: ", req.params.id)
    const registros = await cargoSheet.getTodos()
    const resultado = []
    const filtrados = registros.filter(row => row.curso == req.params.id)
    await filtrados.forEach( registro => {
        resultado.push({ id: registro.id, asignatura: registro.asignaturaNombre})
    })
    return resultado
}

const getPorDocenteCargo = async (docenteCargos) => {
    const cargo = await get()
    const filtrados = await cargo.filter(({ id }) => docenteCargos.some(({ cursoAsignatura }) => id == cursoAsignatura ))
    //console.log("getPorDocenteCargo: ", filtrados)
    return filtrados
}

const getCargoPorRol = async(req, res) => {
    rol = req.body.idRol
    //console.log("Rol: ", rol)
    const registros = await cargoSheet.getTodos()
    const resultado = []
    const filtrados = registros.filter(row => row.rol == rol)
    await filtrados.forEach( registro => {
        resultado.push({ id: registro.id, asignatura: registro.rolNombre})
    })
    //console.log("Resultado: ",resultado)
    return resultado
}


module.exports = {
    get:get,
    getTodos : getTodos,
    getCargoPorRol: getCargoPorRol,
    getPorDocenteCargo:getPorDocenteCargo,
} 