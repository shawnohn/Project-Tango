import React, { useState, useRef } from 'react'

// import EditForm from './EditForm'
import axios from 'axios'

const Field = ({ form_id }) => {
  const [fieldType, setFieldType] = useState(1)
  const [options, setOptions] = useState([])
  const [question, setQuestion] = useState('')
  const [item, setItem] = useState('')

  const currentId = useRef(1)

  const handleChange = (e) => {
    setFieldType(e.target.value)
  }

  const addOption = () => {
    const newOption = { id: currentId.current, item: item }
    setOptions(options.concat(newOption))
    setItem('')
    currentId.current += 1
  }

  const removeOption = (id) => {
    setOptions(options.filter((option) => id !== option.id))
  }

  const postField = async (e) => {
    e.preventDefault()
    const newOptions = options.map((option) => option.item)
    console.log(newOptions)

    try {
      const newField = await axios.post('/field', {
        form_id: form_id,
        question: question,
        options: newOptions,
      })
      setFieldType(1)
      setQuestion('')
      setOptions([])
      currentId.current = 1
    } catch (err) {
      console.log(err.message)
    }

    window.location = '/EditForms'
  }

  return (
    <div className="modal" id="AddField">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Form Field</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body p-0">
            <table className="table mt-auto text-left">
              <tbody>
                <tr>
                  <td style={{ width: '20%' }}>
                    <label>Field*</label>
                  </td>
                  <td colSpan="3">
                    <select
                      className="custom-select"
                      value={fieldType}
                      onChange={handleChange}
                    >
                      <option value="1">Short-answer Question</option>
                      <option value="2">Long-answer Question</option>
                      <option value="3">Multiple Choices</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Label*</label>
                  </td>
                  <td colSpan="3">
                    <input
                      type="text"
                      className="form-control"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    ></input>
                  </td>
                </tr>
                {fieldType == 3 && (
                  <>
                    <tr>
                      <td>
                        <label>Options*</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={item}
                          placeholder="Item"
                          onChange={(e) => setItem(e.target.value)}
                        />
                      </td>
                      <td>
                        <button className="btn btn-success" onClick={addOption}>
                          +
                        </button>
                      </td>
                    </tr>
                    {options.map((option) => (
                      <tr key={option.id}>
                        <td></td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={option.item}
                            disabled={true}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeOption(option.id)}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={(e) => postField(e)}
            >
              Add new
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Field
