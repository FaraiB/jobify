const Joi = require('@hapi/joi')
const validation = require('../utils/validation')

const createSchema = Joi.object().keys({
    title: Joi.string().min(5).max(245).required(),
    description: Joi.string().min(5).max(245).required()
})

const getVagas = db => async () => {
    const vagas = await db.all('select * from vagas')
    return vagas
}
const getVagaById = db => async (id) => {
    const vaga = await db.get('select * from vagas where id = ' + id)
    console.log(vaga)
    return vaga
}
const deleteVaga = db => async (id) => await db.run('delete from vagas where id = ' + id +'')


const insertVaga = db => async (req) => {
    //const {title, description, category} = req.body
    const value = validation.validate(req.body, createSchema)
    await db.run(`insert into vagas(category, title, description) values('${value.category}','${value.title}', '${value.description}')`)
    return true
}
const updateVaga = db => async (req) => {
    const {id} = req.params
    const {title, description, category} = req.body
    await db.run(`update vagas set category = ${category}, title = '${title}', description = '${description}' where id = ${id}`)
}
module.exports = {
    getVagaById,
    getVagas,
    deleteVaga, 
    insertVaga,
    updateVaga
}