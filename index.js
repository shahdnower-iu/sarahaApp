
import express from 'express'
import bootstrap from './src/app.controller.js'

const app = express()

const port =process.env.PORT || 3100 ;
bootstrap(app,express)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))
