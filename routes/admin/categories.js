const init = dbConnection => {
const router = require('express').Router()
const adminCategories = require('../../controller/admin/categories')
router.get('/', adminCategories.getAdminCategories)
router.get('/delete/:id', adminCategories.deleteAdminCategories(dbConnection))
router.get('/nova', adminCategories.insertAdminCategories(dbConnection))
router.post('/nova', adminCategories.insertAdminCategories(dbConnection))
router.get('/editar/:id',adminCategories.editAdminCategories(dbConnection))
router.post('/editar/:id', adminCategories.updateAdminCategories(dbConnection))

return router
}

module.exports = init