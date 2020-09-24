import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/Field'
import axios from 'axios'

const Submit = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Submit Forms</h1>{' '}
      <table className="table mt-5 text-center">
        {/* <tbody>
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
        </tbody> */}
      </table>
    </div>
  )
}

export default Submit
