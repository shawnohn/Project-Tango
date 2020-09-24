import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LinkModal from '../components/LinkModal'
import axios from 'axios'

const Forms = () => {
  const [forms, setForms] = useState([])
  const [title, setTitle] = useState('')
  const [form_id, setFromId] = useState('')

  const postForm = async (e) => {
    e.preventDefault()
    if (title === '') return
    try {
      const newForm = await axios.post('/form', {
        title: title,
      })
      const formObj = {
        form_id: newForm.data.form_id,
        title: newForm.data.title,
      }
      setForms(forms.concat(formObj))
      setTitle('')
    } catch (err) {
      console.log(err.message)
    }
  }

  const getForms = async () => {
    try {
      await axios.get('form').then(({ data }) => {
        setForms(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteForm = async (id) => {
    try {
      await axios.delete(`form/${id}`)

      setForms(forms.filter((form) => form.form_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  const setLocalId = (id) => {
    window.localStorage.setItem('FORM_ID', id)
  }

  useEffect(() => {
    getForms()
  }, [])

  return (
    <div className="container">
      <h1 className="text-center mt-5">Forms</h1>{' '}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Preview</th>
            <th>Publish</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.form_id}>
              <td>{form.title}</td>
              <td>
                <Link
                  to={{
                    pathname: '/editForms',
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => setLocalId(form.form_id)}
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <Link
                  to={{
                    pathname: '/preview',
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => setLocalId(form.form_id)}
                  >
                    Preview
                  </button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#GetLink"
                  onClick={() => setFromId(form.form_id)}
                >
                  Get Link
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteForm(form.form_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#AddForm"
              >
                Add Form
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <LinkModal form_id={form_id} />
      <div className="modal" id="AddForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Form</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <label>Form Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(e) => postForm(e)}
              >
                Create Form
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forms
