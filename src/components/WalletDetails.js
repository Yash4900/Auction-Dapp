import React, { Component } from 'react'
import metamask from '../images/metamask-fox.svg';
import ethlogo from '../images/eth_logo.svg';
import web3 from '../contract/web3.js';

class WalletDetails extends Component {

  constructor() {
    super();
    this.state = {
      address: '',
      balance: 0,
    }
  }

  componentDidMount() {
    this.loadWalletData();
  }

  async loadWalletData() {
    const addresses = await web3.eth.getAccounts();
    var balance = await web3.eth.getBalance(addresses[0]);
    balance = web3.utils.fromWei(balance, 'ether');
    this.setState({ address: addresses[0], balance: balance })
  }

  render() {
    return (
      <div id="wallet" className="p-4">
        <img src={metamask} height="25vh" alt="metamask" />
        <br />
        <div id="address">{this.state.address}</div>
        <div id="balance" className="w500 my-2">
          <img src={ethlogo} height="20vh" alt="ethlogo" /> <span>{this.state.balance}</span> ETH
        </div>
      </div>
    )
  }
}

export default WalletDetails



