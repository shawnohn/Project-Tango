const express = require('express')
const router = express.Router()
const pool = require('../db')

// create a submission
router.post('/:form_id', async (req, res) => {
  try {
    const { form_id } = req.params
    const { contents } = req.body
    const newSubmission = await pool.query(
      'insert into submission (form_id, contents) values($1, $2) returning *',
      [form_id, contents]
    )
    res.status(201).json(newSubmission.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// get all submission
router.get('/', async (req, res) => {
  try {
    const allForm = await pool.query('select * from submission')
    res.status(200).json(allForm.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// get a submission
router.get('/:form_id', async (req, res) => {
  try {
    const { form_id } = req.params
    const submissions = await pool.query(
      'select * from submission where form_id = $1',
      [form_id]
    )
    res.status(200).json(submissions.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// // update a submission
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const { title } = req.body
//     await pool.query('update form set title = $1 where form_id = $2', [
//       title,
//       id,
//     ])
//     res.status(200).json('updated!')
//   } catch (err) {
//     console.error(err.message)
//   }
// })

// // delete a submission
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     await pool.query('delete from form where form_id = $1', [id])
//     res.status(200).json('deleted!')
//   } catch (err) {
//     console.error(err.message)
//   }
// })

module.exports = router
