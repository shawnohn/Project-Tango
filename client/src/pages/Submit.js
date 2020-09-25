import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Submit = ({ match }) => {
  const [isValid, setValid] = useState(false)
  const [fields, setFields] = useState([])
  const [options, setOptions] = useState([])
  const [submission, setSubmission] = useState()
  const [isSubmitted, setSubmitted] = useState(false)
  const [form_id, setFormId] = useState()

  const isValidLink = async () => {
    const link = window.location.pathname.substr(1, 5)
    try {
      await axios.get(`/publication/valid/${link}`).then((res) => {
        if (res.status === 404) {
          setValid(false)
        } else {
          setValid(true)
          setFields(res.data)
          setFormId(res.data[0].form_id)

          // create & set objects to store selected option
          // e.g. { id: [field_id], selected: [a selected value of M.C options]}
          var options = []
          res.data.forEach((field) => {
            if (field.options.length > 0) {
              options.push({ question: field.question, selected: '' })
            }
          })
          setOptions(options)
        }
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const isChecked = (question, val) => {
    const obj = options.find((option) => option.question === question)
    return obj === undefined ? false : obj.selected === val
  }

  const handleChange = (question, val) => {
    setOptions(
      options.map((option) =>
        option.question === question ? { ...option, selected: val } : option
      )
    )
    setSubmission({
      ...submission,
      [question]: val,
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setSubmission({
      ...submission,
      [name]: value,
    })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    await axios
      .post(`/submission/${form_id}`, {
        contents: submission,
      })
      .then(({ status }) => {
        console.log(status)
        status === 201 && setSubmitted(true)
      })
  }

  useEffect(() => {
    isValidLink()
  }, [])

  return (
    isValid && (
      <div className="container">
        <h1 className="text-center mt-4">Submit Form</h1>
        {isSubmitted ? (
          <h1 className="text-center mt-4">Thank you for your submission!</h1>
        ) : (
          <form onSubmit={onSubmitForm}>
            <table className="table mt-4 text-center">
              <tbody>
                {fields.map((field) => (
                  <tr key={field.field_id}>
                    <td>{field.question}</td>
                    <td>
                      {field.field_type === 1 ? (
                        <input
                          type="text"
                          name={field.question}
                          className="form-control"
                          onChange={onChange}
                        ></input>
                      ) : field.field_type === 2 ? (
                        <textarea
                          type="text"
                          name={field.question}
                          className="form-control"
                          onChange={onChange}
                        ></textarea>
                      ) : (
                        <div className="form-check form-check-inline float-left">
                          {field.options.map((option, i) => (
                            <label key={i}>
                              <input
                                className="form-check-input"
                                type="radio"
                                value={option}
                                checked={isChecked(field.question, option)}
                                onChange={() =>
                                  handleChange(field.question, option)
                                }
                              ></input>
                              {option}&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success float-right"
                      onClick={onSubmitForm}
                    >
                      Submit Form
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </div>
    )
  )
}

export default Submit
