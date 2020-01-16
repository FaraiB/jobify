const path = require('path')
const sqlite = require('sqlite')
const dbConnection = sqlite.open(path.resolve(__dirname,'database.sqlite'), {Promise})

const port = process.env.PORT || 3000 //will use env variable port or 3000

const app = require('./app')(dbConnection)

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categories (id INTEGER PRIMARY KEY, category TEXT);')
    await db.run('create table if not exists vagas (id INTEGER PRIMARY KEY, category INTEGER, title TEXT, description TEXT);')
}
init()

app.listen(port, (err) => {
    if(err){
        console.log("The Jobify server could not be started")
    }else{
        console.log('The Jobify server is running...')
    }
})