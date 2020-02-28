const category = require('../../models/category')

const getAdminCategories = async(req, res) => {
    res.render('admin/categories')
}
const deleteAdminCategories = dbConnection => async(req, res) => {
    const db = await dbConnection
    await category.deleteCategory(db)(req.params.id)
    res.redirect('/admin/categories')
}
/*const newAdminCategories = async(req, res) =>{
    res.render('admin/nova-category',  {
        form: {},
        errors: []
    })
}*/
const insertAdminCategories = dbConnection => async(req, res) =>{
    const db = await dbConnection
    if(req.method === 'GET'){
        res.render('admin/nova-category', {
            form: {},
            errors: []
        }) 
    }else{
        try{
            await category.insertCategory(db)(req)
            res.redirect('/admin/categories')
        }catch(err){
            res.render('admin/nova-category',{
                form: req.body,
                errors: err.errors.fields
            })
        }
    }
    
    
}
const editAdminCategories = dbConnection => async(req, res) =>{
    const db = await dbConnection
    const categories = await category.getCategoryById(db)(req.params.id)
    res.render('admin/editar-category', {categories})
}

const updateAdminCategories = dbConnection => async(req, res) =>{
    const db = await dbConnection
    await category.updateCategory(db)(req)
    res.redirect('/admin/categories')
}
module.exports = {
    getAdminCategories, 
    deleteAdminCategories, 
    //newAdminCategories, 
    insertAdminCategories, 
    editAdminCategories, 
    updateAdminCategories
}