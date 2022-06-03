import React, { useState } from 'react'
import metamask from '../images/metamask-fox.svg';
import ethlogo from '../images/eth_logo.svg';
import web3 from '../contract/web3.js';

function WalletDetails() {

  const [address, setAddress] = useState(web3.eth.getAddress()[0]);

  return (
    <div id="wallet" className="p-4">
      <img src={metamask} height="25vh" alt="metamask" />
      <div id="balance" className="w500 my-2">
        <img src={ethlogo} height="20vh" alt="ethlogo" /> <span>{ address }</span> ETH
      </div>
    </div>
  )
}

export default WalletDetails