const express = require('express')
const router = express.Router()
const pool = require('../db')

// get a publication link
router.get('/:form_id', async (req, res) => {
  try {
    const { form_id } = req.params
    const link = Math.random().toString(36).substr(2, 5)
    const publication = await pool.query(
      'insert into publication (form_id, link) values($1, $2) returning *',
      [form_id, link]
    )
    res.status(200).json(publication.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// validate a publication link
router.get('/valid/:link', async (req, res) => {
  try {
    const { link } = req.params
    const publication = await pool.query(
      'select * from publication where link = $1',
      [link]
    )
    if (publication.rows.length > 0) {
      try {
        const form_id = publication.rows[0].form_id
        const allField = await pool.query(
          'select * from field where form_id = $1',
          [form_id]
        )
        res.status(200).json(allField.rows)
      } catch (err) {
        console.error(err.message)
      }
    } else {
      res.status(404).send('Invalid Link!')
    }
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router
