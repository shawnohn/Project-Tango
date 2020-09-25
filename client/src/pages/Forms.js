import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LinkModal from '../components/LinkModal'
import axios from 'axios'

const Forms = () => {
  const [forms, setForms] = useState([])
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

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
      await axios.get('/form').then(({ data }) => {
        setForms(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const getFormLink = async (id) => {
    try {
      await axios.get(`/publication/${id}`).then(({ data }) => {
        setLink(
          window.location.protocol +
            '//' +
            window.location.host +
            '/' +
            data.link
        )
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const setLocalInfo = (id, title) => {
    window.localStorage.setItem('FORM_ID', id)
    window.localStorage.setItem('FORM_TITLE', title)
  }

  useEffect(() => {
    getForms()
  }, [])

  return (
    <div className="container">
      <h1 className="text-center mt-4">Forms</h1>
      <table className="table mt-4 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Preview</th>
            <th>Publish</th>
            <th>Submissions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.form_id}>
              <td>{form.title}</td>
              <td>
                <Link
                  to={{
                    pathname: '/editform',
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => setLocalInfo(form.form_id, form.title)}
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
                    className="btn btn-warning"
                    onClick={() => setLocalInfo(form.form_id, form.title)}
                  >
                    Preview
                  </button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => getFormLink(form.form_id)}
                  data-toggle="modal"
                  data-target="#GetLink"
                >
                  Get Link
                </button>
              </td>
              <td>
                <Link
                  to={{
                    pathname: '/submissions',
                  }}
                >
                  <button
                    className="btn btn-info"
                    onClick={() => setLocalInfo(form.form_id, form.title)}
                  >
                    View Submissions
                  </button>
                </Link>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5">
              <button
                type="button"
                className="btn btn-success float-right"
                data-toggle="modal"
                data-target="#AddForm"
              >
                Add Form
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <LinkModal link={link} />
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
