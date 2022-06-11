import React from "react";

function AcknowledgementModal(props) {
  return (
    <div id="background">
      <div className="p-4 rounded" id="modal">
        <div id="close">
          <button id="close-btn" onClick={props.toggleModal}>
            X
          </button>
        </div>
        <div className="w700" id="modal-title">
          {props.title}
        </div>
        <div className="center py-4 w500 f14" id="modal-body">
          {props.body}
        </div>
        <div className="center" id="modal-actions">
          <button
            className="btn btn-success px-5 f14"
            onClick={props.toggleModal}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default AcknowledgementModal;
