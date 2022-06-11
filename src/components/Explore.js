import React, { Component } from "react";
import Item from "./Item";
import auctionInstance from "../contract/contractInstance.js";
import itemInstance from "../contract/itemInstance.js";
import filter from "../images/filter.png";
import web3 from "web3";

export class Explore extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filter: "All Items",
    };
  }

  componentWillMount() {
    this.fetchItems();
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  show = (item) => {
    if (this.state.filter === "All Items") {
      return true;
    } else if (this.state.filter === "My Auctions") {
      return this.props.address === item.owner;
    } else {
      return item.hasBidded;
    }
  };

  fetchItems = () => {
    let index = 0;
    auctionInstance.methods
      .getAllAuctions()
      .call()
      .then((items) => {
        items.forEach(async (address) => {
          const instance = itemInstance(address);
          const bid = await instance.methods.bidders(this.props.address).call();
          instance.methods
            .getItemDetails()
            .call()
            .then((itemData) => {
              this.setState({
                items: [
                  {
                    id: index,
                    name: itemData.itemName,
                    description: itemData.itemDesc,
                    images: itemData.itemImages.split(" "),
                    currentBid: web3.utils.fromWei(
                      itemData.currentBid,
                      "ether"
                    ),
                    incBy: web3.utils.fromWei(itemData.incBy, "ether"),
                    highestBidder: itemData.highestBidder,
                    deadline: itemData.itemDeadline,
                    owner: itemData.itemOwner,
                    hasBidded: bid !== "0",
                  },
                  ...this.state.items,
                ],
              });
              index = index + 1;
            });
        });
      });
  };

  render() {
    return (
      <div className="my-2">
        <div id="explore-header" className="my-3">
          <div id="filter" className="f14">
            <img className="m-2" src={filter} alt="filter" width="12vh" />
            <select
              name="filters"
              id="filters"
              onChange={this.handleFilterChange}
            >
              <option value="All Items">All Items</option>
              <option value="My Auctions">My Auctions</option>
              <option value="Bidded Items">Bidded Items</option>
            </select>
          </div>
        </div>
        <div id="items">
          {this.state.items.map((item, index) => {
            if (this.show(item)) {
              return <Item key={item.id} item={item}></Item>;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Explore;
