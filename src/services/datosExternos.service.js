const axios = require('axios');

const PARTIDOS_URL = "https://apis.datos.gob.ar/georef/api/departamentos?max=5000&provincia=06"
const LOCALIDADES_URL = "https://apis.datos.gob.ar/georef/api/localidades?max=5000&departamento=";


async function getPartidos() {
    try {
        const response = await axios.get(PARTIDOS_URL)
        const partidos = response.data.departamentos
        return partidos
      } catch (error) {
        throw new Error("Error al obtener los departamentos: " + error.message);
      }
}

async function getLocalidades(idPartido) {
    try {
        const response = await axios.get(LOCALIDADES_URL+idPartido)
        const localidades = response.data.localidades
        return partidos
      } catch (error) {
        throw new Error("Error al obtener los departamentos: " + error.message);
      }
}

module.exports = {
    getPartidos,
    getLocalidades,
}