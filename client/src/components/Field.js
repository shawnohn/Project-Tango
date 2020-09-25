import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const Field = ({ form_id }) => {
  const [fieldType, setFieldType] = useState([])
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [optionItem, setItem] = useState('')
  const [selectedType, setSelectedType] = useState()
  const optionID = useRef(1)

  const getTypes = async () => {
    try {
      await axios.get('/fieldType').then(({ data }) => {
        setFieldType(data)
        setSelectedType(data[0].type_id)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const addOption = () => {
    if (optionItem === '') return
    const newOption = { id: optionID.current, item: optionItem }
    setOptions(options.concat(newOption))
    setItem('')
    optionID.current += 1
  }

  const removeOption = (id) => {
    setOptions(options.filter((option) => id !== option.id))
  }

  const postField = async (e) => {
    e.preventDefault()
    const newOptions = options.map((option) => option.item)
    console.log(newOptions)

    try {
      await axios.post('/field', {
        form_id: form_id,
        field_type: parseInt(selectedType),
        question: question,
        options: newOptions,
      })
      setFieldType('1')
      setQuestion('')
      setOptions([])
      optionID.current = 1
    } catch (err) {
      console.log(err.message)
    }

    window.location = '/EditForms'
  }

  const handleChange = (e) => {
    setSelectedType(e.target.value)
  }

  useEffect(() => {
    getTypes()
  }, [])

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
                      value={selectedType}
                      onChange={handleChange}
                    >
                      {fieldType.map((type) => (
                        <option key={type.type_id} value={type.type_id}>
                          {type.description}
                        </option>
                      ))}
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
                {selectedType === '3' && (
                  <>
                    <tr>
                      <td>
                        <label>Options*</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={optionItem}
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
