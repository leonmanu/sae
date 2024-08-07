const req = require('express/lib/request')
const boletinSheet = require('../sheets/boletin.sheet')
const calificacionSheet =  require("../sheets/calificacion.sheet")
const estudianteSheet = require('../sheets/estudiante.sheet')
const { getUnoPorIdEstudiante } = require('./estudianteCurso.service')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    
    registros = await calificacionSheet.getCalificacion()

    return registros
}

const getUnoEstudianteAsignatura = async (elemento) => {
    
    registros = await calificacionSheet.getCalificacion()
    resultado = await registros.filter(row => row.estudiante === elemento.estudiante && row.asignatura === elemento.asignatura)
    return resultado[0]
}

const getUnique = async () => {
    
    registros = await calificacionSheet.getCalificacion()
    
    return registros
}

const getEstudiantePorAsignatura = async (asignatura, curso) => {
    
    registros = await calificacionSheet.getCalificacion()
    resultado = await registros.filter( row => row.asignatura === asignatura && row.curso === curso)
    console.log("curso: ",curso)
    return resultado
}

const getPorAsignatura = async (asignatura) => {
    
    registros = await calificacionSheet.getCalificacion()
    resultado = await registros.filter( row => row.asignatura === asignatura)
    //console.log("curso: ",asignatura)
    return resultado
}

const getPorCursoAsignaturaOrden = async (asignatura, clave) => {
    console.log("Asignatura ",asignatura," curso ",clave)
    registros = await calificacionSheet.getOrdenado()
    resultados = await registros.filter( row => row.asignatura == asignatura && row.curso == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)

    return resultadoJson
}

const getPorCursoOrden = async (clave) => {
    console.log(asignatura," curso ",clave)
    registros = await calificacionSheet.getOrdenado()
    resultados = await registros.filter( row => row.asignatura == asignatura && row.curso == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)

    return resultadoJson
}

const getEstudianteAsignatura = async (estudiante, asignatura) => { //para saber si existe estudiante con esa asignatura
    console.log("getSiExiteEstudianteAsignatura > ",estudiante," > ",asignatura)
    registros = await calificacionSheet.getCalificacionCruda()
    resultado = await registros.filter( row => row.estudiante === estudiante && row.asignatura === asignatura)

    return resultado
}

const postCalificacion = async (jsonParse) => {
    const calificacionExistente = await getEstudianteAsignatura(jsonParse.estudiante, jsonParse.asignatura)
    
    console.log("Calificción == ", calificacionExistente[0])
    
    if (calificacionExistente[0]) {
        //console.log("EXISTE:: ",calificacionExistente[0]._rowNumber)
        const resultado = await calificacionSheet.modificablesArray(calificacionExistente[0], jsonParse)
        return resultado
    } else {
        //console.log("NO existe:: ",jsonParse.rowNumber)
        //console.log("ESTUDIANTE: ",jsonParse)
        const resultado = await calificacionSheet.postCalificacion(jsonParse)
        return resultado
    }
    
}

const postArray = async (jsonArray) => {
    var i=0
     for (let index = 0; index < jsonArray.length; index++) {
        let elemento = jsonArray[index]
        if (elemento.rowNumber !== '') {
            put(elemento)
            i++
        } else{
            post(elemento)
            i++
        }
    }
    
    return i
}

const post = async (elemento) => {
    const resultado = await calificacionSheet.post(elemento)

    return resultado
}

const put = async (elemento) => {
    const existente = await getUnoEstudianteAsignatura(elemento)
    const existeModificado = await emparejar(existente,elemento)
    resultado = await calificacionSheet.save(existeModificado)
    console.log("resultado ", resultado)
    return resultado
}

const getCrudaPorIdEstudiante = async (id) => {
    registros = await boletinSheet.getValoracionCurda()
    filtrados = await registros.filter( row => row.estudiante == id )
    console.log("filtrados: " + filtrados)
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}

const getPorDni = async (dni) => {
    console.log("DNI > ",dni)
    registros = await estudianteSheet.getTodo()
    filtrados = await registros.filter( row => row.dni == dni )
    //condicional si filtro.length > 0
    estudianteCursos = await estudianteSheet.getEstudianteCurso2()
    estudianteCurso = await estudianteCursos.filter(row => row.estudiante == filtrados[0].id)
    const resultadoJson = await utilidadesService.convertToJson(estudianteCurso)
    
    return estudianteCurso[0]
}

const getPorCurso = async (clave) => {
    registros = await boletinSheet.getValoracion()
    filtrados = filtrados = await registros.filter( row => row.cursoClave == clave )
    const resultadoJson = await utilidadesService.convertToJson(filtrados)
    
    return resultadoJson
}

async function emparejar(objExistente, objNuevo) {
    var header = objExistente._sheet.headerValues
    header.forEach(r => {
        objExistente[r] = objNuevo[r]
    })

    return objExistente
}


module.exports = {
    get:get,
    getUnoEstudianteAsignatura:getUnoEstudianteAsignatura,
    post: post,
    put: put,
    postCalificacion: postCalificacion,
    getEstudiantePorAsignatura: getEstudiantePorAsignatura,
    getEstudianteAsignatura: getEstudianteAsignatura,
    getPorCursoAsignaturaOrden:getPorCursoAsignaturaOrden,
    getPorDni:getPorDni,
    //getPorIdEstudiante: getPorIdEstudiante,
    getPorCurso: getPorCurso,
    postArray: postArray,
    getCrudaPorIdEstudiante:getCrudaPorIdEstudiante,
    getPorAsignatura:getPorAsignatura,
    emparejar:emparejar,
    // getCargosTodos : getCargosTodos,
    // getPorDocente: getPorDocente,
    
    // getPorDocenteCargoCurso: getPorDocenteCargoCurso
} 