const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const estudianteCursoSheet =require("../sheets/estudianteCurso.sheet")
const estudianteCursoService =require("../services/estudianteCurso.service")
const utilidadesService = require('./utilidades.service')
const estudianteSchema = require('../models/estudiante.schema')
const estudianteDb = require('../db/estudiante.db')
const personaService = require('./persona.service')
const PersonaClass = require('../models/persona.class')
const EstudianteClass = require('../models/estudiante.class')
const { v4: uuidv4 } = require('uuid');

const get = async () => { //este trae de la hoja estudiantes
    registros = await estudianteSheet.get()
    return registros
}

const getTodos = async (req, res) => {
    registros = await estudianteSheet.getTodoEstudiante_sheet()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ 
            id: registro.id,
            nombre: registro.nombre,
            codigo: registro.codigo,
            jerarquia: registro.jerarqui
        })
    })
    return resultado
}

const getTodosDb = async (req, res) => {
    registros = await estudianteSheet.get()
    console.log("Data: ",registros)
    return registros
}

async function getUno(id){
    const registros =  await estudianteSheet.get()
    const resultado = registros.filter(row => row.id == id)
    const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultadoJson[0]
    
}

async function getPorId(id){
    const registros =  await estudianteSheet.get()
    const resultado = registros.filter(row => row.id == id)
    //console.log(resultadoJson[0])

    return resultado[0]
}

async function getPorDni(dni){
    const registros =  await estudianteSheet.get()
    const resultado = registros.filter(row => row.dni == dni)

    //const resultadoJson = await utilidadesService.convertToJson(resultado)
    
    return resultado[0]
    
}

async function getPorCursoAsignatura(req){
    console.log("getPorCurso: ", req.params.curso)
    const registros =  await estudianteSheet.get()
    const resultados = registros.filter(row => row.curso === req.params.curso && row.idAsignatura == req.params.asignatura )

    return resultados
}

async function getPorCurso(clave){//1* anterior, próximo a borrar
    const registros =  await estudianteSheet.getTodoPorCurso()
    const resultados = await registros.filter(row => row.cursoClave == clave)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    
    return resultadoJson
}

async function getPorIdCurso(idCursoParam, cLectivo = null) {
    const estudianteCurso = await estudianteCursoService.get();
    const estudiantes = await this.get();

    let filtrados = estudiantes
        .map(estudiante => {
            const curso = estudianteCurso.find(({ idEstudiante, idCurso, fechaBaja }) =>
                estudiante.id === idEstudiante && idCursoParam === idCurso && (!fechaBaja || fechaBaja === '')
            );
            return curso ? { ...estudiante, cLectivo: curso.cLectivo } : null;
        })
        .filter(estudiante => estudiante !== null);

    if (cLectivo) {
        filtrados = filtrados.filter(estudiante => estudiante.cLectivo === cLectivo);
    } else {
        const cicloLectivoUltimo = filtrados
            .map(estudiante => estudiante.cLectivo)
            .filter(cicloLectivo => cicloLectivo !== undefined && cicloLectivo !== null)
            .sort((a, b) => b.localeCompare(a))[0];

        filtrados = filtrados.filter(estudiante => estudiante.cLectivo === cicloLectivoUltimo);
    }

    //filtrados.sort((a, b) => a.apellido.localeCompare(b.apellido));

    console.log("Filtrados: ", filtrados);
    return filtrados; // Asegúrate de que siempre devuelve un array
}




// async function getPorIdCurso(clave){
//     const registros =  await estudianteSheet.getTodoPorCurso()
//     const resultados = await registros.filter(row => row.cursoClave == clave)
//     const resultadoJson = await utilidadesService.convertToJson(resultados)
    
//     return resultadoJson
// }

async function post(objeto) {
    try {

        objeto["id"] = objeto.personaId = uuidv4(); // Genera un UUID único
        const persona = await personaService.postPersona(objeto);

        objeto["id"] = uuidv4();
        const estudiante = await estudianteSheet.post(objeto)
  
      // Llama al servicio de creación de persona y estudiante
      
      //const registroEstudiante = await estudianteSheet.post(estudianteClass);
  
      return persona;

    } catch (error) {
      // Manejo de errores
      console.error('Error al crear estudiante:', error);
      throw error;
    }
  }

async function put(objExistente, objNuevo){
    console.log("estudianteService -> objExistente.length: ", objExistente._rowNumber)
    if(objExistente._rowNumber > 0){
        var header = objExistente._sheet.headerValues
            header.forEach(r => {
            console.log("header: foreach: ", r)
            objExistente[r] = objNuevo[r]
        })
    }

    resultado = await objExistente.save()
    console.log("objExistente ::   ", objExistente)
    return objExistente
}

async function getUltimo(){
    const registros =  await estudianteSheet.get()
    const indice = registros.length
    const resultado = registros[indice - 1]

    return resultado
}

module.exports = {
    get:get,
    getTodos : getTodos,
    getUno: getUno,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorCurso:getPorCurso,
    post:post,
    getUltimo:getUltimo,
    getPorDni:getPorDni,
    getPorId: getPorId,
    put: put,
    getTodosDb:getTodosDb,
    getPorIdCurso:getPorIdCurso,
} 