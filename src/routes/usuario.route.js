const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {getEstudiantes} = require('../controllers/curso.controller')
const {siExisteUsuario,post,getTodos} = require('../controllers/usuario.controller')
const { getOne } = require('../sheets/estudiante.sheet')
var sessionMiddelware = require('../middelware/session.middelware')


router
    .get('/siExisteUsuario', siExisteUsuario)
    .post('/form', post)
    .get("/logout", (req,res) => {
        req.logout(function(err) {
            if (err) { return next(err) }
            req.app.locals.usuario = null
            res.redirect('/')
          })
    })
    .get('/todos', getTodos)
    


module.exports = router
