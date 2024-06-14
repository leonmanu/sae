let sheet = require('../sheets/estudiante.sheet')
let cursoSheet = require('../sheets/curso.sheet')
const estudianteService = require('../services/estudiante.service')
const estudianteSchema = require('../models/estudiante.schema')
const cursoService = require('../services/curso.service')
const estudianteCursoService = require('../services/estudianteCurso.service')



const get = async (req, res) => {
    try {
        let estudiantes = await estudianteService.get();
        let cursos = await cursoService.get();
        let estudianteCursos = await estudianteCursoService.get();

        for (const estudiante of estudiantes) {
            for (const estudianteCurso of estudianteCursos) {
                if (estudiante.id == estudianteCurso.idEstudiante) {
                    for (const curso of cursos) {
                        if (estudianteCurso.idCurso == curso.id) {
                            estudiante.cLectivo = estudianteCurso.cLectivo
                            estudiante.curso = curso.clave;
                        }
                    }
                }
            }
        }

        await res.render('pages/estudiante/estudiantesLista', { user: req.user._json, estudiantes });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


const getTodos = async (req, res) => {
    estudiantes = await estudianteService.get()
    cursos = await cursoService.get()
    estudianteCursos = await estudianteCursoService.get()
    for (const estudiante of estudiantes) {
    for (const estudianteCurso of estudianteCursos) {
        if (estudiante.id == estudianteCurso.idCampo) {
            for (const curso of cursos) {
                if (estudianteCurso.idCurso == curso.id) {
                    estudiante.curso = curso.clave;
                    console.log("CursoClave: " + campo.clave );
                }
                console.log("---------------")
            }
        }
    }
}
   await res.render('pages/estudiante/estudiantesTodos', {estudiantes})
} 

const getPorCursoAsignatura = async (req,res) =>{
    registros = await estudianteService.getPorCursoAsignatura(req,res)
    //console.log("ESTUDIANTE_CONTROLLER -> GetPorCurso: ", registros)
    res.render('pages/estudiante/estudiantesTodos', {user: req.user._json, registros})
}

//acá consultamos al service por id de estudiante y abrimos la vista Editar
const getPorId = async (req, res) => {
    registro = await estudianteService.getUno(req.params.id)
    estudiante = registro
    //console.log("Estudiante:: ", estudiante)
    res.render('pages/estudiante/estudianteEditar', {estudiante, user: req.user._json})
}

const getFormularioAlta = async (req, res) => {
    const registro = await estudianteService.getUno(req.params.dni)
    let estudiante
    if (registro) {
        estudiante = registro
        console.log("por sí")
    }else{
        estudiante = {
            id: null
        }
        console.log("por no")
    }
    res.render("pages/estudiante/estudianteAlta", {user: req.user,estudiante})
}

const getTodosLista = async (req, res) => {
    const estudiantesArray = []
    const cursos = await cursoService.get() 
    const estudiantes = await estudianteService.get()
    const estudianteCursos = await estudianteCursoService.get()
    await estudiantes.forEach(estudiante=>{
        estudianteCursos.forEach(estudianteCurso=>{
            if (estudianteCurso.estudiante == estudiante.id && estudianteCurso.fechaBaja == null) {
                estudiantesArray.push({estudiante: estudiante,estudianteCurso: estudianteCurso})
            }
        })
    })
   // console.log("estudianteCursos: ", estudiantesArray[0])

    res.render("pages/estudiante/todosLista", {user: req.user, estudiantesArray,cursos})
}

const getOne = async (req, res) => {
    registros = await cursoSheet.get()
    res.render('pages/index', {registros})
}

const getInforme = async (req, res) => {
    registros = await sheet.get()
    res.render('pages/informe', {registros})
}

const pintarForm = (req, res) => {
    res.render('pages/formulario')
}

const post = async (req, res) => {
    const objeto = await req.body
    estudiante = await estudianteService.post(objeto)
    await console.log("ESTUDIANTE -> "+estudiante.apellido)
    res.send(estudiante)

    //res.redirect('/')
}

const put = async (req, res) => {
    var objNuevo = req.body
    var objExistente = await estudianteService.getPorId(objNuevo.id)
    var resultado = await estudianteService.put(objExistente, objNuevo)
    
    res.redirect('back');
}

const alta = async (req, res) => {
    var objNuevo = req.body
    var objExistente = await estudianteService.getPorId(objNuevo.id)
    var resultado = await estudianteService.put(objExistente, objNuevo)
    
    res.redirect('back');
}

const del = async (req, res) => {
    registros = await sheet.del()
}



module.exports = {
    get : get,
    getTodos: getTodos,
    getOne : getOne,
    getInforme: getInforme,
    pintarForm : pintarForm,
    post : post,
    put : put,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorId: getPorId,
    getTodosLista: getTodosLista,
    alta,
    getFormularioAlta
} 