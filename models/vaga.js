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
    const {title, description, category} = req.body
    await db.run(`insert into vagas(category, title, description) values('${category}','${title}', '${description}')`)
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