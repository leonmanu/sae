const {Router} = require('express')
const passport = require('passport')
const router = Router()

const estudianteSchema = require('../models/estudiante.schema')

const {
            getPorCursoAsignatura,
            getPorId, 
            getFormularioAlta,
            put,
            getTodos,
            getTodosLista,
            get,
            post
        } = require('../controllers/estudiante.controller')

var sessionMiddelware = require('../middelware/session.middelware')

router
    .post('/', post)
    .get('/', get)
    .get('/alta', getFormularioAlta)
    .post('/alta', post)
    .get('/curso/:curso/asignatura/:asignatura', getPorCursoAsignatura)
    .get('/:id/editar', getPorId)
    .post('/editar', put)
    .get('/todos', getTodos)
    .get('/todos/lista', getTodosLista)
    
module.exports = router