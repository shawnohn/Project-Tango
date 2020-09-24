import React, { useEffect, useState } from 'react'
import Field from '../components/Field'
import axios from 'axios'

const EditForms = (props) => {
  const [fields, setFields] = useState([])
  const form_id = window.localStorage.getItem('FORM_ID')

  const getFields = async () => {
    try {
      await axios.get(`field/${form_id}`).then(({ data }) => {
        setFields(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteField = async (id) => {
    try {
      await axios.delete(`field/${id}`)
      setFields(fields.filter((field) => field.field_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFields()
  }, [])

  return (
    <div className="container">
      <h1 className="text-center mt-5">Edit Forms</h1>{' '}
      <button
        type="button"
        className="btn btn-success float-right"
        data-toggle="modal"
        data-target="#AddField"
      >
        Add Form Field
      </button>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Question</th>
            <th>Options</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.field_id}>
              <td>{field.question}</td>
              <td>
                {(field.options !== null && field.options.length) > 0
                  ? field.options.reduce((prev, curr) => prev + ', ' + curr)
                  : ''}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteField(field.field_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Field form_id={form_id} />
    </div>
  )
}

export default EditForms