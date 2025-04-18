const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

// mongoose.connect(
//   process.env.MONGODB_URI
// )
//   .then(
//     ()=> console.log('Conectado!!')
//   )
//   .catch((err) => console.error(err))


const path = require("path")
const bodyParser = require('body-parser')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const passport = require('passport')
const inicialRouter = require('./routes/google.route')
const usuarioRouter = require('./routes/usuario.route')
const cursoRouter = require('./routes/curso.route')
const docenteCargoRouter = require('./routes/docenteCargo.route')
const cargoRouter = require('./routes/cargo.route')
const rolRouter = require('./routes/rol.route')
const revistaRouter = require('./routes/revista.route')
const estudianteRouter = require('./routes/estudiante.route')
const cursoEstudianteRouter = require('./routes/cursoEstudiante.route')
const calificacionRouter = require('./routes/calificacion.route')

var sessionMiddelware = require('./middelware/session.middelware')
const usuarioController = require('./controllers/usuario.controller')
const LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const app = express()
var hour = 36000000;

mongoose.connect('mongodb+srv://leonmanu:Gusanito@calificador.dtcbf.mongodb.net/crud?retryWrites=true&w=majority')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err))

app    
    .use(express.static(__dirname + '/public'))
    .set("views", path.join(__dirname, "/views"))
    .set("view engine", "ejs")
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(session({
      cookie: {
        expires: new Date(Date.now() + hour)
      },
      secret: "secret",
      resave: false ,
      saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(inicialRouter)
    .use("/usuario", usuarioRouter)
    .use("/curso", cursoRouter)
    .use("/docente/cargo", docenteCargoRouter)
    .use("/cargo", cargoRouter)
    .use("/rol", rolRouter)
    .use("/revista", revistaRouter)
    .use("/estudiante", estudianteRouter)
    .use("/estudiante/curso", cursoEstudianteRouter)
    .use("/calificacion", calificacionRouter)

module.exports = app


// mongo db conexión

authUser = async (request, accessToken, refreshToken, profile, done)  => {
    return done(null,profile) //corregir para que se rompa la sesión si no está registrado
}

passport.use(new GoogleStrategy({
    clientID:   "460276808063-s47r0nb77ceta3a7lumqqk1ojaq8gigi.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: process.env.NODE_ENV === 'production'
    ? "https://sae-75zw.onrender.com/auth/google/callback"
    : "http://localhost:3000/auth/google/callback",
    passReqToCallback : true
  }, authUser
  
))

passport.serializeUser( (user, done) => {
    done(null, user)
 })
 passport.deserializeUser((user, done) => {
    done (null, user)
  })
passport.authenticate()



