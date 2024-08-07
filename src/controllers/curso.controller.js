const req = require('express/lib/request')
const asignaturaService = require('../services/asignatura.service')
const calificacionService = require('../services/calificacion.service')

const cursoService = require('../services/curso.service')
const estudianteService = require('../services/estudiante.service')
const estudianteCursoService = require('../services/estudianteCurso.service')

const get = async (req, res) => {
    registros = await cursoService.get(req, res)

    res.send(registros)
}

const cursoGetTodo = async (req, res) => {
    console.log("controller.cursoGetTodo entró")
    registros = await cursoService.getTodos(req, res)
    console.log("controller.cursoGetTodo ,,,", registros)
    res.send(registros)
}

const getCursosTodos = async (req, res) => {
    registros = await cursoService.getCursosTodos()
    res.render("pages/curso/cursos", {user: req.user, cursos: registros})
}

const getEstudiantes = async (req, res) => {
    const clave = await req.params.clave
    const cLectivo = await req.params.cLectivo

    const curso = await cursoService.getPorClave(clave)
    
    const cursos = await cursoService.getCursosTodos()
    const estudiantes = await estudianteService.getPorIdCurso(curso.id, cLectivo)
    console.log("estudiantes: " + estudiantes )

    //console.log("estudianteCursos: ", estudianteCursos)

    res.render("pages/curso/cursoEstudiantes", {user: req.user, clave, estudiantes, curso, cursos})
}

// const getEstudiantes = async (req, res) => {
//     const clave = req.params.clave
//     registros = await estudianteService.getPorCurso(clave)
//     res.render("pages/curso/cursoEstudiantes", {user: req.user, clave, estudiantes: registros})
// }

module.exports = {
    get,
    cursoGetTodo: cursoGetTodo,
    getCursosTodos: getCursosTodos,
    getEstudiantes: getEstudiantes,
}