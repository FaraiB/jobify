const init = dbConnection => {
    const router = require('express').Router()
    const vagas = require('./vagas')
    const adminCategories = require('./admin/categories')
    const adminVagas = require('./admin/vagas')
    const home = require('../controller/home')
    const adminHome = require('../controller/admin/home')
    
    router.use('/vaga', vagas(dbConnection))
    router.use('/admin/vagas' , adminVagas(dbConnection))
    router.use('/admin/categories', adminCategories(dbConnection))
    router.get('/', home.getIndex(dbConnection) )
    router.get('/admin', adminHome.getIndex)
    return router

}

module.exports = init