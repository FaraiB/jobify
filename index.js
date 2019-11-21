const express = require('express')// in order to use express dependency
const app = express()
const bodyParser = require('body-parser')

const path = require('path')

const sqlite = require('sqlite')
const dbConnection = sqlite.open(path.resolve(__dirname,'database.sqlite'), {Promise})

const port = process.env.PORT || 3000 //will use env variable port or 3000

app.use('/admin', (req, res, next) =>{
    if(req.hostname === 'localhost'){
        next()
    }else{
        res.send('Not allowed')
    }

})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async(request, response) => { //when '/' is called, do function
    const db = await dbConnection
    const categoriesDb = await db.all('select * from categories;')
    const vagas = await db.all('select * from vagas;')
    const categories = categoriesDb.map(cat => {
        return{
            ...cat,//... spreads everything into cat
            vagas: vagas.filter( vaga => vaga.category === cat.id)
        }
    })
    response.render('home', {
        categories
    })
})
app.get('/vaga/:id', async (request, response) => { //when '/' is called, do function
    const db = await dbConnection
    const vaga = await db.get('select * from vagas where id = '+ request.params.id)
    console.log(vaga)
    response.render('vaga', {
        vaga
    })
})

app.get('/admin', (req, res) => {
    res.render('admin/home')
})

app.get('/admin/vagas', async(req, res) => {
    const db = await dbConnection
    const vagas = await db.all('select * from vagas')
    res.render('admin/vagas', {vagas})
})

app.get('/admin/categories', async(req, res) => {
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    res.render('admin/categories', {categories})
})

app.get('/admin/vagas/delete/:id', async(req, res) => {
    const db = await dbConnection
    await db.run('delete from vagas where id = ' + req.params.id +'')
    res.redirect('/admin/vagas')
})

app.get('/admin/categories/delete/:id', async(req, res) => {
    const db = await dbConnection
    await db.run('delete from categories where id = ' + req.params.id +'')
    res.redirect('/admin/categories')
})

app.get('/admin/vagas/nova', async(req, res) =>{
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    res.render('admin/nova-vaga', {categories})
})

app.get('/admin/categories/nova', async(req, res) =>{
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    res.render('admin/nova-category', {categories})
})

app.post('/admin/vagas/nova', async(req, res) =>{
    const db = await dbConnection
    const {title, description, category} = req.body
    await db.run(`insert into vagas(category, title, description) values('${category}','${title}', '${description}')`)
    res.redirect('/admin/vagas')
})

app.post('/admin/categories/nova', async(req, res) =>{
    const db = await dbConnection
    const {category} = req.body
    await db.run(`insert into categories(category) values('${category}')`)
    res.redirect('/admin/categories')
})

app.get('/admin/vagas/editar/:id', async(req, res) =>{
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    const vaga = await db.get('select * from vagas where id = ' + req.params.id)
    res.render('admin/editar-vaga', {categories, vaga})
})

app.get('/admin/categories/editar/:id', async(req, res) =>{
    const db = await dbConnection
    const categories = await db.get('select * from categories where id = ' + req.params.id)
    res.render('admin/editar-category', {categories})
})

app.post('/admin/vagas/editar/:id', async(req, res) =>{
    const db = await dbConnection
    const {id} = req.params
    const {title, description, category} = req.body
    await db.run(`update vagas set category = ${category}, title = '${title}', description = '${description}' where id = ${id}`)
    res.redirect('/admin/vagas')
})

app.post('/admin/categories/editar/:id', async(req, res) =>{
    const db = await dbConnection
    const {id} = req.params
    const {category} = req.body
    await db.run(`update categories set category = '${category}' where id = ${id}`)
    res.redirect('/admin/categories')
})

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categories (id INTEGER PRIMARY KEY, category TEXT);')
    await db.run('create table if not exists vagas (id INTEGER PRIMARY KEY, category INTEGER, title TEXT, description TEXT);')
    //const category = 'Marketing team'
    //await db.run(`insert into categories(category) values('${category}')`)
    //const vaga = 'Social Media (San Francisco)'
    //const description = 'Vaga para fullstack developer que fez o Fullstack lab'
    //await db.run(`insert into vagas(category, title, description) values(2,'${vaga}', '${description}')`)
}
init()

app.listen(port, (err) => {
    if(err){
        console.log("The Jobify server could not be started")
    }else{
        console.log('The Jobify server is running...')
    }
})