const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')

// const config = require('./config/key')

app.use(cors())

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(cookieParser())

// app.use('/api/users', require('./routes/users'))
// app.use('/api/product', require('./routes/product'))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
})
