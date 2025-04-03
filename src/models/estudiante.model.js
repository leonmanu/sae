const mongoose = require('mongoose');
const personaSchema = require('./persona.model').schema;

const estudianteSchema = new mongoose.Schema({
  // Hereda todos los campos de Persona
  personaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona', // Referencia al modelo Persona
    required: true,
  },

  libro: {
    type: String,
    required: [true, 'El libro es obligatorio'],
    trim: true,
  },
  folio: {
    type: String,
    required: [true, 'El folio es obligatorio'],
    trim: true,
    unique: true, // El folio debe ser único
  },
  trayectoria: [{
    curso: {
      type: String,
      required: true,
      trim: true
    },
    cLectivo: {
      type: String,
      required: true,
      trim: true
    }
  }],
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante;