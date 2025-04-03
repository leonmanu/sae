let sheet = require('../sheets/estudiante.sheet')
let cursoSheet = require('../sheets/curso.sheet')
const estudianteService = require('../services/estudiante.service')
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
    try {
        const registro = await estudianteService.getUno(req.params.dni);
        const cursos = await cursoService.get();
        
        // Generar array de años (desde el actual hasta 20 años atrás)
        const anioActual = new Date().getFullYear();
        const aniosDisponibles = Array.from({ length: 21 }, (_, i) => anioActual - i);
        
        res.render("pages/estudiante/estudianteAlta", {
            user: req.user,
            estudiante: registro || { id: null },
            cursos,
            anios: aniosDisponibles  // Enviamos los años a la vista
        });
        
    } catch (error) {
        res.status(500).render('pages/error', { 
            error: 'Error al cargar el formulario',
            user: req.user 
        });
    }
};

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
    try {
        const objeto = await req.body
        nuevoEstudiante = await estudianteService.post(objeto)
        res.status(201).json({
            success: true,
            data: nuevoEstudiante,
            message: 'Estudiante creado exitosamente'
        })                         
    } catch (error) {
        // 4. Manejo de errores
        const statusCode = error.message.includes('ya existe') ? 409 : 500;
        
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
    }

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