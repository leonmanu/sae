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
    cLectivo: {
      type: String,
      required: true,
      trim: true
    },
    cursoInscripcion: { // El curso en el que el estudiante está formalmente inscripto
      type: String,
      required: true,
      trim: true
    }
  }],

  historialAsignaturas: [{
    asignatura: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asignatura', // Referencia al modelo Asignatura
      required: true
    },
    cursoAsignatura: { // El curso al que pertenece la asignatura cursada
      type: String,
      required: true,
      trim: true
    },
    cicloLectivoCursada: {
      type: String,
      required: true,
      trim: true
    },
    calificaciones: [{
      periodo: {
        type: String,
        trim: true
      },
      nota: {
        type: Number,
        min: 1,
        max: 10
      }
    }],
    promedioAnual: {
      type: Number,
      min: 1,
      max: 10
    },
    notaDiciembreFebreroMarzo: {
      type: Number,
      min: 1,
      max: 10
    },
    calificacionDefinitiva: {
      type: Number,
      min: 1,
      max: 10
    },
    situacionFinal: { // 'Aprobada', 'Reprobada', 'Cursando'
      type: String,
      trim: true
    },
    observaciones: {
      type: String,
      trim: true
    }
  }]
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante;