import React, { Component } from 'react';
import items from './items';
import Item  from './Item';
export class Explore extends Component {
  render() {
    return (
      <div className="m-3">
        <div className="title">
          <h1 className="w900">Explore Items</h1>
        </div>
        <div id="items">
          {
            items.map((item) => (<Item key={item.id} item={item} ></Item>))
          }
        </div>
      </div>
    )
  }
}

export default Explore