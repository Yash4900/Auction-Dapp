import React from 'react'

function ConfirmationModal(props) {
  return (
    <div id="background">
      <div className="p-4 rounded" id="modal">
        <div id="close">
          <button id="close-btn" onClick={props.toggleModal} >X</button>
        </div>
        <div className="w700" id="modal-title">
          { props.title }
        </div>
        <div className="center py-4 w500 f14" id="modal-body">
          { props.body }
        </div>
        <div className="center" id="modal-actions">
          <button className="btn btn-danger px-5 f14" onClick={props.toggleModal}>No</button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button className="btn btn-success px-5 f14" onClick={props.onYesClick}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal