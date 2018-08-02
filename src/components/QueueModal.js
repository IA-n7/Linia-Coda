import React, { Component } from "react";
import('./QueueModal.css')


class QueueModal extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="modal-background">
        <div class="modal">
          <h1>Modal</h1>
          <p>Also Modal</p>
        </div>
      </div>
    );
  }

}

export default QueueModal