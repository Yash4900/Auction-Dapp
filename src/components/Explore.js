import React, { Component } from 'react';
import Item  from './Item';
import auctionInstance from '../contract/contractInstance.js';
import itemInstance from '../contract/itemInstance.js';
import web3 from 'web3';

export class Explore extends Component {

  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    auctionInstance.methods.getAllAuctions().call().then((items) => {
      items.forEach(address => {
        const instance = itemInstance(address);
        let index = 0;
        instance.methods.getItemDetails().call().then((itemData) => {
          var date = new Date(0);
          date.setUTCSeconds(itemData.itemDeadline);
          this.setState({
            items: [ ...this.state.items,
              {
                id: index,
                name: itemData.itemName,
                description: itemData.itemDesc,
                images: itemData.itemImages.split(" "),
                currentBid: web3.utils.fromWei(itemData.currentBid, "ether"),
                incBy: web3.utils.fromWei(itemData.incBy, "ether"),
                highestBidder: itemData.highestBidder,
                deadline: date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
date.getHours() + ":" + date.getMinutes()
              }
            ]
          });
          index = index + 1;
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
            this.state.items.map((item, index) => (<Item key={item.id} item={item} ></Item>))
          }
        </div>
      </div>
    )
  }
}

export default Explore