import React, { Component } from "react";
import metamask from "../images/metamask-fox.svg";
import ethlogo from "../images/eth_logo.svg";

class WalletDetails extends Component {
  render() {
    return (
      <div id="wallet" className="p-4">
        <img src={metamask} height="25vh" alt="metamask" />
        <div id="balance" className="w500 m-2">
          <img src={ethlogo} height="20vh" alt="ethlogo" />{" "}
          <span>{this.props.balance} </span> ETH
        </div>
      </div>
    );
  }
}

export default WalletDetails;
