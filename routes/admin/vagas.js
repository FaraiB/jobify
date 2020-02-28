const init = dbConnection => {
    const router = require('express').Router()
    const adminVagas = require('../../controller/admin/vagas')
    

    router.get('/', adminVagas.getAdminVagas)
    router.get('/delete/:id', adminVagas.deleteAdminVaga(dbConnection))
    router.get('/nova', adminVagas.insertAdminVaga(dbConnection))
    router.post('/nova', adminVagas.insertAdminVaga(dbConnection))
    router.get('/editar/:id', adminVagas.editAdminVaga(dbConnection))
    router.post('/editar/:id', adminVagas.updateAdminVaga(dbConnection))
    

    return router
}

module.exports = init
