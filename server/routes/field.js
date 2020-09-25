const express = require('express')
const router = express.Router()
const pool = require('../db')

// create a field
router.post('/', async (req, res) => {
  try {
    const { form_id, field_type, question, options } = req.body
    const newField = await pool.query(
      'insert into field (form_id, field_type, question, options) values($1, $2, $3, $4) returning *',
      [form_id, field_type, question, options]
    )
    res.status(201).json(newField.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// get all fields
router.get('/:form_id', async (req, res) => {
  try {
    const { form_id } = req.params
    const allField = await pool.query(
      'select * from field where form_id = $1',
      [form_id]
    )
    res.status(200).json(allField.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// delete a field
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('delete from field where field_id = $1', [id])
    res.status(200).json('deleted!')
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router
