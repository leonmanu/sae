const req = require('express/lib/request')
const asignaturaService = require('../services/asignatura.service')
const cursoService = require('../services/curso.service')
const utilidadesService = require('../services/utilidades.service')

const getPorCurso = async (req, res) => {
    const clave = await req.params.clave
    const curso = await cursoService.getPorClave(clave)
    const asignaturas = await asignaturaService.getAsignaturasPorIdCurso(curso.id)

    res.render('pages/curso/cursoAsignaturas', {user: req.user._json, asignaturas, clave})
}

const getPorIdCursoAjax = async (req, res) => {
    const idCurso = await req.params.idCurso
    console.log("idCurso: ",idCurso)
    //const curso = await cursoService.getPorId
    const asignaturas = await asignaturaService.getPorIdCurso(idCurso)
    console.log("Asignaturas:::::>>>> ", asignaturas)
    //const asignaturasJson = await utilidadesService.convertToJson(asignaturas)
    res.send(asignaturas)
}

module.exports = {
    getPorCurso: getPorCurso,
    getPorIdCursoAjax:getPorIdCursoAjax,
} 