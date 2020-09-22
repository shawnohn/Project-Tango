require('dotenv')
const express = require('express')
const cors = require('cors')
const { join } = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build')))
}

app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, '../client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})

module.exports = app
