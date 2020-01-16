const vaga = require('../models/vaga')

const getVaga = dbConnection => async (req, res) => { //when '/' is called, do function
    const db = await dbConnection
    const vagaById = await vaga.getVagaById(db)(req.params.id)
    res.render('vaga', {
        vaga: vagaById
    })
    return vagaById
}
module.exports = {
    getVaga
}