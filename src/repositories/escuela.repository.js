const Escuela = require('../models/escuela.model');

class EscuelaRepository {
  // Crear una nueva escuela
  static async crearEscuela(escuelaData) {
    try {
      console.log(escuelaData);

      // Crear la escuela
      const nuevaEscuela = new Escuela(escuelaData);
      await nuevaEscuela.save();

      return nuevaEscuela;
    } catch (error) {
      console.error("Error al crear la escuela:", error.message);
      throw error; // Re-lanzar el error para manejarlo en el servicio
    }
  }

  // Obtener todas las escuelas
  static async obtenerEscuelas() {
    try {
      const escuelas = await Escuela.find();
      return escuelas;
    } catch (error) {
      console.error("Error al obtener las escuelas:", error.message);
      throw error;
    }
  }

    // Obtener una escuela por su CUE
    static async obtenerEscuelaPorClave(clave) {
      try {
        const escuela = await Escuela.findOne({ clave });
        return escuela;
      } catch (error) {
        console.error("Error al obtener la escuela por CUE:", error.message);
        throw error;
      }
    }

  // Obtener una escuela por su CUE
  static async obtenerEscuelaPorCue(cue) {
    try {
      const escuela = await Escuela.findOne({ cue });
      return escuela;
    } catch (error) {
      console.error("Error al obtener la escuela por CUE:", error.message);
      throw error;
    }
  }

  // Actualizar una escuela por su CUE
  static async actualizarEscuela(clave, escuelaData) {
    try {
      const escuelaActualizada = await Escuela.findOneAndUpdate(
        { clave: clave }, // Filtro
        escuelaData, // Datos a actualizar
        { new: true } // Devuelve el documento actualizado
      )
      console.log("Respository Actualizar escuela -> findOneAndUpdate: ", escuelaActualizada)
      return escuelaActualizada;
    } catch (error) {
      console.error("Error al actualizar la escuela:", error.message);
      throw error;
    }
  }

  // Eliminar una escuela por su CUE
  static async eliminarEscuela(cue) {
    try {
      const escuelaEliminada = await Escuela.findOneAndDelete({ cue });
      return escuelaEliminada;
    } catch (error) {
      console.error("Error al eliminar la escuela:", error.message);
      throw error;
    }
  }
}

// Exportar la clase
module.exports = EscuelaRepository;