require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

const { join } = require('path')

// middleware
app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build')))
}

//db config

// routes

// post form
app.post('/form', async (req, res) => {
  try {
    const { description } = req.body
    const newForm = await pool.query(
      'insert into form (description) values($1) returning *',
      [description]
    )

    res.status(201).json(newForm.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// get all forms
app.get('/form', async (req, res) => {
  try {
    const { description } = req.body
    const allForm = await pool.query('select * from form')
    res.status(200).json(allForm.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// get a form
app.get('/form/:id', async (req, res) => {
  try {
    const { id } = req.params
    const form = await pool.query('select * from form where form_id = $1', [id])
    res.status(200).json(form.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// update a form
app.put('/form/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateForm = await pool.query(
      'update form set description = $1 where form_id = $2',
      [description, id]
    )
    res.status(200).json('updated!')
  } catch (err) {
    console.error(err.message)
  }
})

// delete a form
app.delete('/form/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateForm = await pool.query('delete from form where form_id = $1', [
      id,
    ])
    res.status(200).json('deleted!')
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, '../client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})

module.exports = app
