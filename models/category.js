const Joi = require('@hapi/joi')
const validation = require('../utils/validation')

const createSchema = Joi.object().keys({
    category: Joi.string().min(5).max(245).required()
})


const getCategories = db => async () => {//injecting db as a dependancy
    const categories = await db.all('select * from categories')
    return categories
}

const getCategoryById = db => async (id) => await db.get('select * from categories where id = ' + id)

const deleteCategory = db => async (id) => await db.run('delete from categories where id = ' + id +'')


const insertCategory = db => async (req) => {
    //const {category} = req.body
                const value = validation.validate(req.body, createSchema)
                await db.run(`insert into categories(category) values('${value.category}')`)
                return true
}
const updateCategory = db => async (req) => {
    const {id} = req.params
    const {category} = req.body
    await db.run(`update categories set category = '${category}' where id = ${id}`)
}
module.exports = {
    getCategories,
    getCategoryById,
    deleteCategory,
    insertCategory, 
    updateCategory
}