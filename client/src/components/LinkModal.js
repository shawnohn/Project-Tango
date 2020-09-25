import React from 'react'

const LinkModal = ({ link }) => {
  const copyToClipboard = () => {
    var t = document.createElement('textarea')
    document.body.appendChild(t)
    t.value = link
    t.select()
    document.execCommand('copy')
    document.body.removeChild(t)
    alert('Copied!')
  }

  return (
    <div className="modal" id="GetLink">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Form Publication</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label>Link for Outside User</label>
              <div className="input-group">
                <input
                  id="myLink"
                  type="text"
                  className="form-control"
                  defaultValue={link}
                  disabled={true}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkModal
