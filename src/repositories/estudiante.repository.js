const Persona = require('../models/persona.model');
const Estudiante = require('../models/estudiante.model');

class EstudianteRepository {
  // Crear un nuevo estudiante
  static async crearEstudiante(estudianteData) {
    console.log(estudianteData);

    // Extraer los datos de Persona y Estudiante
    const { libro, folio, ...personaData } = estudianteData;

    // 1. Crear la Persona
    const nuevaPersona = new Persona(personaData);
    await nuevaPersona.save();

    // 2. Crear el Estudiante con referencia a la Persona
    const nuevoEstudiante = new Estudiante({
      libro,
      folio,
      personaId: nuevaPersona._id, // Referencia a la Persona creada
    });
    await nuevoEstudiante.save();

    return nuevoEstudiante;
  }
}

// Exportar la clase
module.exports = EstudianteRepository;