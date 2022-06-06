import React, { Component } from 'react';
import Item  from './Item';
import auctionInstance from '../contract/contractInstance.js';
import itemInstance from '../contract/itemInstance.js';

export class Explore extends Component {

  constructor() {
    super();
    // this.state({
    //   items: []
    // })
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    auctionInstance.methods.getAllAuctions().call().then((items) => {
      items.forEach(address => {
        const instance = itemInstance(address);
        instance.methods.getItemDetails().call().then((itemData) => {
          console.log(itemData);
        })
      });
    })
  }

  render() {
    return (
      <div className="m-3">
        <div className="title">
          <h1 className="w900">Explore Items</h1>
        </div>
        <div id="items">
          {
            // items.map((item, index) => (<Item key={index} item={item} ></Item>))
          }
        </div>
      </div>
    )
  }
}

export default Explore