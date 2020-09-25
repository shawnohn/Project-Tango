import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Submissions = () => {
  const [submissions, setSubmissions] = useState([])
  const form_id = window.localStorage.getItem('FORM_ID')
  const form_title = window.localStorage.getItem('FORM_TITLE')

  const getSubmissions = async (id) => {
    try {
      await axios.get(`/submission/${id}`).then(({ data }) => {
        setSubmissions(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const getContents = (contents) => {
    let string = []
    for (let key in contents) {
      string.push(
        <table key={key} style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '35%' }}>
                <p className="text-left">{key}</p>
              </td>
              <td style={{ width: '65%' }}>
                <p className="text-left">{contents[key]}</p>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
    return string
  }

  useEffect(() => {
    getSubmissions(form_id)
  }, [form_id])

  return (
    <div className="container">
      <h1 className="text-center mt-4">Submissions</h1>
      <h2 className="text-center">{form_title}</h2>
      <Link
        to={{
          pathname: '/',
        }}
      >
        <button type="button" className="btn btn-warning float-left">
          Back to Forms
        </button>
      </Link>
      <table className="table mt-4 text-center">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Submitter</th>
            <th>Contents</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.submission_id}>
              <td></td>
              <td>{getContents(submission.contents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Submissions
