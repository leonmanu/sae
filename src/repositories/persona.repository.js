const Persona = require('../models/persona.model');

class PersonaRepository {
  // Crear una nueva persona
  static async post(personaData) {
    try {
      const nuevaPersona = new Persona(personaData);
      await nuevaPersona.save();
      return nuevaPersona;
    } catch (error) {
      throw new Error('Error al crear persona: ' + error.message);
    }
  }

  // Obtener todas las personas
  static async getTodas() {
    try {
      const personas = await Persona.find();
      return personas;
    } catch (error) {
      throw new Error('Error al obtener personas: ' + error.message);
    }
  }

  // Obtener una persona por ID
  static async getPorId(id) {
    try {
      const persona = await Persona.findById(id);
      if (!persona) {
        throw new Error('Persona no encontrada');
      }
      return persona;
    } catch (error) {
      throw new Error('Error al obtener persona: ' + error.message);
    }
  }

  // Actualizar una persona por ID
  static async put(id, personaData) {
    try {
      const persona = await Persona.findByIdAndUpdate(id, personaData, { new: true });
      if (!persona) {
        throw new Error('Persona no encontrada');
      }
      return persona;
    } catch (error) {
      throw new Error('Error al actualizar persona: ' + error.message);
    }
  }

  // Eliminar una persona por ID
  static async del(id) {
    try {
      const persona = await Persona.findByIdAndDelete(id);
      if (!persona) {
        throw new Error('Persona no encontrada');
      }
      return persona;
    } catch (error) {
      throw new Error('Error al eliminar persona: ' + error.message);
    }
  }
}

module.exports = PersonaRepository;