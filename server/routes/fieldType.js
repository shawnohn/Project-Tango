const express = require('express')
const router = express.Router()
const pool = require('../db')

// get all fieldTypes
router.get('/', async (req, res) => {
  try {
    const allTypes = await pool.query('select * from fieldType')
    res.status(200).json(allTypes.rows)
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router
