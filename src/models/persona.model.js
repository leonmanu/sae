const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  // Campos existentes
  tipoDocumento: {
    type: String,
    required: [true, 'El tipo de documento es obligatorio'],
    trim: true,
  },
  documento: {
    type: String,
    required: [true, 'El documento es obligatorio'],
    trim: true,
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria'],
  },
  lugarNacimiento: {
    type: String,
    required: [true, 'El lugar de nacimiento es obligatorio'],
    trim: true,
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Por favor ingresa un email válido',
    },
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value); // Ejemplo: 10 dígitos numéricos
      },
      message: 'El teléfono debe tener 10 dígitos numéricos',
    },
  },

  // Nuevos campos del domicilio
  domicilioCalle: {
    type: String,
    required: [true, 'La calle del domicilio es obligatoria'],
    trim: true,
  },
  domicilioNumero: {
    type: String,
    required: [true, 'El número del domicilio es obligatorio'],
    trim: true,
  },
  domicilioBarrio: {
    type: String,
    required: [true, 'El barrio del domicilio es obligatorio'],
    trim: true,
  },
  domicilioLocalidad: {
    type: String,
    required: [true, 'La localidad del domicilio es obligatoria'],
    trim: true,
  },
});

const Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;