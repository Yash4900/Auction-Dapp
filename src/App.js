import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavigationLinks from './components/NavigationLinks';
import WalletDetails from './components/WalletDetails';
import Explore from './components/Explore';
import ItemDetails from './components/ItemDetails';
import CreateAuction from './components/CreateAuction';
import web3 from './contract/web3';
import Loading from './components/Loading';

import React, { Component } from 'react'

export class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      address: '',
      balance: 0
    }
  }

  componentDidMount() {
    this.fetchWalletData();
  }

  async fetchWalletData() {
    const addresses = await web3.eth.getAccounts();
    var balance = await web3.eth.getBalance(addresses[1]);
    balance = Math.round(web3.utils.fromWei(balance, 'ether') * 100) / 100;
    this.setState({ address: addresses[1], balance: balance, loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <Router>
        <div className="container col-md-10">
          <div id="app">
            <div id="navigator">
              <WalletDetails address={this.state.address} balance={this.state.balance} />
              <NavigationLinks />
            </div>
            <div>
              <Routes>
                <Route exact path="/" element={<Explore address={this.state.address} balance={this.state.balance} />} />
                <Route path="/item/:id" element={<ItemDetails address={this.state.address} balance={this.state.balance} />} />
                <Route path="/create" element={<CreateAuction address={this.state.address} balance={this.state.balance} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;