const init = dbConnection => {
    const express = require('express')// in order to use express dependency
    const app = express()
    const bodyParser = require('body-parser')
    const path = require('path')

    const routes = require('./routes')
    const vaga = require('./models/vaga')
    const category = require('./models/category')

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.use(express.static(path.join(__dirname,'public')))
    app.use(bodyParser.urlencoded({extended: true}))


    app.use('/admin', (req, res, next) =>{
        if(req.hostname === 'localhost'){
            next()
        }else{
            res.send('Not allowed')
        }

    })

    app.use(async(req, res, next) => {
        const db = await dbConnection
        const categories = await category.getCategories(db)()//inject db then call function
        const vagas = await vaga.getVagas(db)()
        res.locals = {
            categories,
            vagas
        }
        next()
    })

    app.use(routes(dbConnection))
    return app
}
module.exports = init
