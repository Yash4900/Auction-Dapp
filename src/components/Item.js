import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Timer from './Timer';
import ethereum from '../images/ethereum.PNG';

export class Item extends Component {
  render() {
    const item = this.props.item
    console.log(parseInt(Date.now() / 1000));
    console.log(item.deadline);
    return (
      <div className="item">
        <div className="m-2 rounded-3 content shadow-sm">
          <div className="item-image rounded-4" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${item.images[1]})`, backgroundSize: 'cover' }}>
            <NavLink to={`item/${ item.id }`}>
              <button className="place-bid rounded-pill m-2 px-2 py-1 w500">Place a Bid</button>
            </NavLink>
          </div>
          <p className="m-2 w700">{ item.name }</p>
          <div className="m-2" id="cbd">
            <div>Current Bid</div>
            <div>Ending in</div>
          </div>
          <div className="m-2" id="cbd-val">
            <div id="current-bid">
              <img src={ethereum} alt="ethereum" width="16vh" />
              { item.currentBid } ETH
            </div>
            <Timer seconds={item.deadline - parseInt(Date.now() / 1000)} ></Timer>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Item