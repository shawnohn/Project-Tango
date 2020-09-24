const express = require('express')
const router = express.Router()
const pool = require('../db')

// get a publication link
router.get('/:id', async (req, res) => {
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

module.exports = router
