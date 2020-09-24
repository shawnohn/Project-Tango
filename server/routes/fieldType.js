const express = require('express')
const router = express.Router()
const pool = require('../db')

// get all fields
router.get('/', async (req, res) => {
  try {
    const allTypes = await pool.query('select * from fieldType')
    res.status(200).json(allTypes.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// // get a form
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const form = await pool.query('select * from form where form_id = $1', [id])
//     res.status(200).json(form.rows[0])
//   } catch (err) {
//     console.error(err.message)
//   }
// })

// // update a form
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const { title } = req.body
//     const updateForm = await pool.query(
//       'update form set title = $1 where form_id = $2',
//       [title, id]
//     )
//     res.status(200).json('updated!')
//   } catch (err) {
//     console.error(err.message)
//   }
// })

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
