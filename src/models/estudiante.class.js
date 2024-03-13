// estudiante.js
const { v4: uuidv4 } = require('uuid');

const PersonaClass = require("./persona.class");

class EstudianteClass extends PersonaClass {
  constructor(personaId, dni, cuil, apellido, nombre, nacimientoFecha, nacimientoLugar, nacionalidad, matricula) {
    super(personaId, dni, cuil, apellido, nombre, nacimientoFecha, nacimientoLugar, nacionalidad); // Llama al constructor de la clase Persona
    this.id = uuidv4(); // Genera un UUID único
    this.personaId = personaId;
    this.matricula = matricula;
  }

  // Puedes agregar métodos específicos para la clase Estudiante si es necesario
}

module.exports = EstudianteClass;