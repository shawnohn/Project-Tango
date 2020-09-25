import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Submissions = () => {
  const [submissions, setSubmissions] = useState([])
  const form_id = window.localStorage.getItem('FORM_ID')
  const form_title = window.localStorage.getItem('FORM_TITLE')

  const getSubmissions = async () => {
    try {
      await axios.get(`/submission/${form_id}`).then(({ data }) => {
        setSubmissions(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const getContents = (contents) => {
    let string = []
    // console.log(Object.values(contents))
    for (let key in contents) {
      console.log(key, contents[key])
      string.push(
        // <div className="d-flex" style={{ width: '100%' }}>
        <table style={{ width: '100%' }}>
          <td style={{ width: '35%' }}>
            <p class="text-left">{key}</p>
          </td>
          <td style={{ width: '65%' }}>
            <p class="text-left">{contents[key]}</p>
          </td>
        </table>
      )
    }
    console.log(string)
    return string
  }

  useEffect(() => {
    getSubmissions()
  }, [])

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
