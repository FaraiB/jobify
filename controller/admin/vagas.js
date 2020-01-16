const vaga = require('../../models/vaga')

const getAdminVagas = async(req, res) => {
    res.render('admin/vagas')
}
const deleteAdminVaga = dbConnection => async(req, res) => {
    const db = await dbConnection
    await vaga.deleteVaga(db)(req.params.id)
    res.redirect('/admin/vagas')
}
const newAdminVaga = async(req, res) =>{
    res.render('admin/nova-vaga')
}
const insertAdminVaga = dbConnection => async(req, res) =>{
    const db = await dbConnection
    await vaga.insertVaga(db)(req)
    res.redirect('/admin/vagas')
}
const editAdminVaga = dbConnection => async(req, res) =>{
    const db = await dbConnection
    const vagaById = await vaga.getVagaById(db)(req.params.id)
    res.render('admin/editar-vaga', {
            vaga: vagaById
    })
}
const updateAdminVaga = dbConnection => async(req, res) =>{
    const db = await dbConnection
    await vaga.updateVaga(db)(req)
    res.redirect('/admin/vagas')
}
module.exports = {
    getAdminVagas,
    deleteAdminVaga,
    newAdminVaga,
    insertAdminVaga,
    editAdminVaga,
    updateAdminVaga
}