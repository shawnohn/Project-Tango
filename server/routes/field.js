const express = require('express')
const router = express.Router()
const pool = require('../db')

// field_id SERIAL PRIMARY KEY,
// form_id SERIAL REFERENCES form(form_id),
// question VARCHAR(50),
// options VARCHAR(15) [],
// isActive BOOLEAN DEFAULT TRUE,
// isMendotary BOOLEAN DEFAULT FALSE

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

module.exports = router
