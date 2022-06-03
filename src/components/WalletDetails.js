import React, { useState } from 'react'
import metamask from '../images/metamask-fox.svg';
import ethlogo from '../images/eth_logo.svg';

function WalletDetails() {
  
  return (
    <div id="wallet" className="p-4">
      <img src={metamask} height="25vh" alt="metamask" />
      <div id="balance" className="w500 my-2">
        <img src={ethlogo} height="20vh" alt="ethlogo" /> <span>0.3456</span> ETH
      </div>
    </div>
  )
}

export default WalletDetails