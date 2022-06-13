import React, { useState, useEffect } from "react";
import Item from "./Item";
import auctionInstance from "../contract/contractInstance.js";
import itemInstance from "../contract/itemInstance.js";
import web3 from "web3";

function Explore(props) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const show = (item) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Auctioned") {
      return props.address === item.owner;
    } else {
      return item.hasBidded;
    }
  };

  const handleFilterChange = (e) => {
    const prevActive = document.getElementsByClassName("active-category-btn");
    prevActive[0].classList.remove("active-category-btn");
    document.getElementById(e.target.id).classList.add("active-category-btn");
    setFilter(e.target.id);
  };

  const handleSearchQueryChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchItems = () => {
    let index = 0;
    auctionInstance.methods
      .getAllAuctions()
      .call()
      .then((products) => {
        products.forEach(async (address) => {
          const instance = itemInstance(address);
          const bid = await instance.methods.bidders(props.address).call();
          instance.methods
            .getItemDetails()
            .call()
            .then((itemData) => {
              setItems((prev) => {
                return [
                  {
                    id: index,
                    name: itemData.itemName,
                    description: itemData.itemDesc,
                    images: itemData.itemImages.split(" "),
                    basePrice: web3.utils.fromWei(itemData.basePrice, "ether"),
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
                  ...prev,
                ];
              });
              index = index + 1;
            });
        });
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="mt-4 row">
      <div className="col-md-2">
        <div id="filter" className="f14">
          <button
            className="category-btn active-category-btn"
            id="All"
            onClick={(e) => handleFilterChange(e)}
          >
            All Items
          </button>
          <button
            className="category-btn"
            id="Auctioned"
            onClick={(e) => handleFilterChange(e)}
          >
            Auctioned
          </button>
          <button
            className="category-btn"
            id="Bids"
            onClick={(e) => handleFilterChange(e)}
          >
            Bids
          </button>
        </div>
      </div>
      <div className="col-md-10">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            className="f14 p-2 rounded"
            onChange={(e) => handleSearchQueryChange(e)}
          />
        </div>
        <div id="items">
          {items.map((item) => {
            if (show(item) && item.name.toLowerCase().includes(search)) {
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

export default Explore;
