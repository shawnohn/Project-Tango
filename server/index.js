require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

//middleware
app.use(cors())
app.use(express.json())

/*
 * In production mode we will also serve the client
 */
if (process.env.NODE_ENV === 'production') {
  console.log(`Production mode detected: Serving client`)
  const path = require('path')

  const buildDir = path.join(__dirname, '../client/build')

  app.use(express.static(buildDir))

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})
