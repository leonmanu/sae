// persona.js
const { v4: uuidv4 } = require('uuid');

class PersonaClass {
    constructor(dni, cuil, apellido, nombre, nacimientoFecha, nacimientoLugar, nacionalidad) {
      this.id = uuidv4(); // Genera un UUID único
      this.dni = dni;
      this.cuil = cuil;
      this.apellido = apellido;
      this.nombre = nombre;
      this.nacimientoFecha = nacimientoFecha;
      this.nacimientoLugar = nacimientoLugar;
      this.nacionalidad = nacionalidad;
    }
  
    obtenerNombreCompleto() {
      return `${this.nombre} ${this.apellido}`;
    }
  }
  
  module.exports = PersonaClass;