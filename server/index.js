require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
const { join } = require('path')

const formRouter = require('./routes/form')
const fieldRouter = require('./routes/field')
const fieldTypeRouter = require('./routes/fieldType')
const publicationRouter = require('./routes/publication')
const submissionRouter = require('./routes/submission')

// middleware
app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build')))
}

// routes
app.use('/form', formRouter)
app.use('/field', fieldRouter)
app.use('/fieldType', fieldTypeRouter)
app.use('/publication', publicationRouter)
app.use('/submission', submissionRouter)

app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, '../client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})

module.exports = app
