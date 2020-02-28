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
    res.render('admin/nova-vaga', {
        form: {},
        errors: []
    })
}
const insertAdminVaga = dbConnection => async(req, res) =>{
    const db = await dbConnection
    if(req.method === 'GET'){
        res.render('admin/nova-vaga', {
            form: {},
            errors: []
        })
   }
    else{
        try{
            await vaga.insertVaga(db)(req)
            res.redirect('/admin/vagas')
        }catch(err){
            res.render('admin/nova-vaga', {
                form: req.body,
                errors: err.errors.fields
            })
        }
   }
    
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