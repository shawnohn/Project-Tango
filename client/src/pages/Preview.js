import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Preview = () => {
  const [fields, setFields] = useState([])
  const [options, setOptions] = useState([])
  const form_id = window.localStorage.getItem('FORM_ID')
  const form_title = window.localStorage.getItem('FORM_TITLE')

  const getFields = async (id) => {
    try {
      await axios.get(`/field/${id}`).then(({ data }) => {
        setFields(data)

        // create & set objects to store selected option
        var options = []
        data.forEach((field) => {
          if (field.options.length > 0) {
            options.push({ id: field.field_id, selected: '' })
          }
        })
        setOptions(options)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const isChecked = (id, val) => {
    const obj = options.find((option) => option.id === id)
    return obj === undefined ? false : obj.selected === val
  }

  const handleChange = (id, val) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, selected: val } : option
      )
    )
  }

  useEffect(() => {
    getFields(form_id)
  }, [form_id])

  return (
    <div className="container">
      <h1 className="text-center mt-4">Preview Form</h1>
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
        <tbody>
          {fields.map((field) => (
            <tr key={field.field_id}>
              <td>{field.question}</td>
              <td>
                {field.field_type === 1 ? (
                  <input type="text" className="form-control"></input>
                ) : field.field_type === 2 ? (
                  <textarea type="text" className="form-control"></textarea>
                ) : (
                  <div className="form-check form-check-inline float-left">
                    {field.options.map((option, i) => (
                      <label key={i}>
                        <input
                          className="form-check-input"
                          type="radio"
                          value={option}
                          checked={isChecked(field.field_id, option)}
                          onChange={() => handleChange(field.field_id, option)}
                        ></input>
                        {option}&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Preview
