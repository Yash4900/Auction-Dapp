import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavigationLinks from './components/NavigationLinks';
import WalletDetails from './components/WalletDetails';
import Explore from './components/Explore';
import ItemDetails from './components/ItemDetails';
import CreateAuction from './components/CreateAuction';
import MyAuctions from './components/MyAuctions';

function App() {
  return (
    <Router>
      <div className="row" id="app">
        <div className="col-md-2 shadow" id="navigator">
          <WalletDetails />
          <NavigationLinks />
        </div>
        <div className="col-md-10">
          <Routes>
            <Route exact path="/" element={<Explore />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/my-auctions" element={<MyAuctions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;