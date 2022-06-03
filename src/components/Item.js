import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Item extends Component {
  render() {
    const item = this.props.item
    return (
      <div className="item">
        <div className="m-2 rounded-3 content shadow-sm">
          <div className="item-image rounded-3" style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover' }}>
            <NavLink to={`item/${item.id}`}>
              <button className="place-bid rounded-pill m-2 px-2 py-1 w500">Place a Bid</button>
            </NavLink>
          </div>
          <p className="m-2 w700">{item.name}</p>
          <div className="m-2" id="cbd">
            <div>Current Bid</div>
            <div>Deadline</div>
          </div>
          <div className="m-2" id="cbd-val">
            <div>{item.currentBid} ETH</div>
            <div>22-07-2022 11:59</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item