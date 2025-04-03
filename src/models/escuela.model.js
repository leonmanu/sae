const mongoose = require('mongoose');

const escuelaSchema = new mongoose.Schema({
  cue: {
    type: String,
    required: [true, 'El CUE es obligatorio'],
    trim: true,
    unique: true, // El CUE debe ser único
  },
  clave: {
    type: String,
    required: [true, 'La clave es obligatoria'],
    trim: true,
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
    trim: true,
  },
  gestion: {
    type: String,
    required: [true, 'La gestión es obligatoria'],
    enum: ['estatal', 'privada', 'otra'], // Solo permite estos valores
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  nombreAlt: {
    type: String,
    trim: true,
  },
  nivel: {
    type: String,
    required: [true, 'El nivel es obligatorio'],
    enum: ['primario', 'secundario', 'adultos', 'otros'], // Solo permite estos valores
  },
  tipoOrg: {
    type: String,
    required: [true, 'El tipo de organización es obligatorio'],
    trim: true,
  },
  rama: {
    type: String,
    required: [true, 'La rama es obligatoria'],
    trim: true,
  },
  dependencia: {
    type: String,
    required: [true, 'La dependencia es obligatoria'],
    trim: true,
  },
  rpv: {
    type: String,
    required: [true, 'El RPV es obligatorio'],
    trim: true,
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    enum: ['rural', 'urbano'], // Solo permite estos valores
  },
  ruralidad: {
    type: Number,
    required: [true, 'La ruralidad es obligatoria'],
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    trim: true,
  },
  observaciones: {
    type: String,
    trim: true,
  },
  domicilioPartido: {
    type: String,
    trim: true,
  },
  domicilioLocalidad: {
    type: String,
    trim: true,
  },
  domicilioCalle: {
    type: String,
    trim: true,
  },
  domicilioAltura: {
    type: String,
    trim: true,
  },
});

const Escuela = mongoose.model('Escuela', escuelaSchema);

module.exports = Escuela;