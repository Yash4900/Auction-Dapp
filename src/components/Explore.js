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
      filter: "All",
      search: ""
    };
  }

  componentWillMount() {
    this.fetchItems();
  }

  handleFilterChange = (e) => {
    const prevActive = document.getElementsByClassName('active-category-btn');
    prevActive[0].classList.remove('active-category-btn');
    document.getElementById(e.target.id).classList.add('active-category-btn');
    this.setState({ filter: e.target.id });
  };

  handleSearchQueryChange = (e) => {
    this.setState({ search: e.target.value });
  }

  show = (item) => {
    if (this.state.filter === "All") {
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
      <div className="mt-4 row">
        <div className="col-md-2">
          <div id="filter" className="f14">
            <button className="category-btn active-category-btn" id="All" onClick={this.handleFilterChange}>All Items</button>
            <button className="category-btn" id="Auctioned" onClick={this.handleFilterChange}>Auctioned</button>
            <button className="category-btn" id="Bids" onClick={this.handleFilterChange}>Bids</button>
          </div>
        </div>
        <div className="col-md-10">
          <div className="mb-2">
            <input type="text" placeholder="Search..." id="search" className="f14 p-2 rounded" onChange={this.handleSearchQueryChange}/>
          </div>
          <div id="items">
            {this.state.items.map((item, index) => {
              if (this.show(item) && item.name.toLowerCase().includes(this.state.search)) {
                return <Item key={item.id} item={item}></Item>;
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;
