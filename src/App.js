import { Route, Routes } from "react-router-dom";
import NavigationLinks from "./components/NavigationLinks";
import WalletDetails from "./components/WalletDetails";
import Explore from "./components/Explore";
import ItemDetails from "./components/ItemDetails";
import CreateAuction from "./components/CreateAuction";
import Loading from "./components/Loading";
import web3 from "./contract/web3";
import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();

  const fetchWalletData = async () => {
    setLoading(true);
    const addresses = await web3.eth.getAccounts();
    var bal = await web3.eth.getBalance(addresses[2]);
    bal = Math.round(parseFloat(web3.utils.fromWei(bal, "ether")) * 100) / 100;
    setAddress(addresses[2]);
    setBalance(bal);
    setLoading(false);
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
      <div className="container col-md-10">
        <div id="app">
          <div id="navigator">
            <WalletDetails address={address} balance={balance} />
            <NavigationLinks />
          </div>
          <div>
            <Routes>
              <Route
                exact
                path="/"
                element={<Explore address={address} balance={balance} />}
              />
              <Route
                exact path="/item/:id"
                element={<ItemDetails address={address} balance={balance} />}
              />
              <Route
                exact path="/create"
                element={<CreateAuction address={address} balance={balance} />}
              />
            </Routes>
          </div>
        </div>
      </div>
  
  );
}

export default App;
