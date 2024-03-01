import app from '../ProjetoFromZeroToHero/src/app'
const server = app.listen(3000)
server.close(() => {
    console.log('server')
})
