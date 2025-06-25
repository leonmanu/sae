const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  // Referencia a la escuela a la que pertenece este curso
  clave: {
    type: String,
    required: [true, 'La clave es obligatoria'],
    trim: true,
    unique: true
  },
  escuela: {
    type: mongoose.Schema.ObjectId, // Tipo ObjectId para la referencia
    ref: 'Escuela', // Referencia al modelo 'Escuela'
    required: [true, 'El curso debe pertenecer a una escuela'],
  },
  anio: {
    type: Number,
    required: [true, 'El año del curso es obligatorio'],
    min: [1, 'El año no puede ser menor a 1'], // Por ejemplo, 1° año
    max: [7, 'El año no puede ser mayor a 7'], // Asumiendo un máximo de 7 años (primaria o secundaria)
  },
  division: {
    type: String,
    required: [true, 'La división del curso es obligatoria'],
    trim: true,
    uppercase: true, // Para estandarizar (ej: "A", "B", "ÚNICA")
    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'ÚNICA'], // Puedes ajustar estas opciones
  },
  turno: {
    type: String,
    required: [true, 'El turno del curso es obligatorio'],
    enum: ['mañana', 'tarde', 'noche', 'completo'], // Opciones de turno
  },
  ciclo: {
    type: String,
    required: [true, 'El ciclo del curso es obligatorio'],
    enum: ['básico', 'orientado', 'superior', 'primario'], // Ejemplos de ciclos
  },
  // Puedes añadir más campos relevantes para un curso aquí
  cantidadAlumnos: {
    type: Number,
    min: [0, 'La cantidad de alumnos no puede ser negativa'],
    default: 0, // Valor por defecto si no se especifica
  },
  preceptor: {
    type: String,
    trim: true,
  },
  // La fecha de creación del curso (útil para auditorías)
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Índice compuesto para asegurar que no haya cursos duplicados (misma escuela, año y división)
cursoSchema.index({ escuela: 1, anio: 1, division: 1 }, { unique: true });

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;