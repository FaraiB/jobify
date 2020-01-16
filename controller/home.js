const vaga = require('../models/vaga')
const category = require('../models/category')

const getIndex = dbConnection => async(request, response) => { 
const db = await dbConnection//when '/' is called, do function
const categoriesDb = await category.getCategories(db)()//inject db then call function
const vagas = await vaga.getVagas(db)()
const categories = categoriesDb.map(cat => {
    return{
        ...cat,//... spread operator; spreads everything into cat
        vagas: vagas.filter( vaga => vaga.category === cat.id)
    }
})
response.render('home', {
    categories
})
}

module.exports = {
    getIndex 
}