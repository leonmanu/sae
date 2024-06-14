let sheetUsuario = require('../sheets/usuario.sheet')

const get = async (req, res) => {
    res.render('pages/index')
}


module.exports = {
    get
} 