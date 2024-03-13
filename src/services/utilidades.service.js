
const convertToJson = async (resultados) => {
    let jsonArray = [];

    try {
        // Verifica si la hoja de cálculo está vacía
        if (resultados.length === 0) {
            console.log("Utilidades: Array vacío");
            return jsonArray; // Retorna un array vacío si no hay resultados
        }

        // Obtiene los encabezados (header) de la hoja de cálculo
        const header = resultados[0]._sheet.headerValues;

        resultados.forEach((row) => {
            let varuser = {};

            // Agrega el número de fila a la propiedad '_rowNumber'
            varuser['_rowNumber'] = row._rowNumber;

            // Itera sobre los encabezados y agrega cada valor al objeto
            header.forEach((columnName) => {
                varuser[columnName] = row[columnName];
            });

            jsonArray.push(varuser);
        });
    } catch (error) {
        console.error("Error en convertToJson:", error);
        throw error; // Propaga el error si ocurre uno
    }

    return jsonArray;
};

module.exports = {
    convertToJson: convertToJson
};