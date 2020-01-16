const init = dbConnection => {
const router = require('express').Router()
const vagas = require('../controller/vagas')

router.get('/:id', vagas.getVaga(dbConnection) )

return router
}

module.exports = init