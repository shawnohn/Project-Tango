const express = require('express')
const router = express.Router()
const pool = require('../db')

// create a submission
router.post('/', async (req, res) => {
  try {
    const contents = req.body
    const newForm = await pool.query(
      'insert into submission (contents) values($1) returning *',
      [contents]
    )
    // console.log(req.body)
    // console.log(contents)
    // const newForm = await pool.query(
    //   'insert into submission (contents) values($1) returning *',
    //   [contents]
    // )

    res.status(201).json(newForm.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// // get all submission
// router.get('/', async (req, res) => {
//   try {
//     const allForm = await pool.query('select * from form')
//     res.status(200).json(allForm.rows)
//   } catch (err) {
//     console.error(err.message)
//   }
// })

// // get a submission
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const form = await pool.query('select * from form where form_id = $1', [id])
//     res.status(200).json(form.rows[0])
//   } catch (err) {
//     console.error(err.message)
//   }
// })

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