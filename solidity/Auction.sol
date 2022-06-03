pragma solidity 0.5.4;

contract Auction {
    Item[] public items;

    function startAuction(string memory _item_name, string memory _item_desc, string memory _images, uint _item_baseprice, uint _increment_by, uint _deadline) public {
        Item item = new Item(_item_name, _item_desc, _images, _item_baseprice, _increment_by, _deadline);
        items.push(item);
    }

    function getAllAuctions() public view returns (Item[] memory) {
        return items;
    }
}

contract Item {

    string item_name;
    string item_desc;
    string images;
    uint current_bid;
    uint increment_by;
    uint deadline;
    address highest_bidder;

    constructor (string memory _item_name, string memory _item_desc, string memory _images, uint _item_baseprice, uint _increment_by, uint _deadline) public {
        item_name = _item_name;
        item_desc = _item_desc;
        images = _images;
        current_bid = _item_baseprice;
        increment_by = _increment_by;
        deadline = _deadline;
    }

    function getItemDetails() public view returns(string memory itemName, string memory itemDesc, string memory images, uint currentBid, uint incBy, uint deadline, address highestBidder) {
        itemName = item_name;
        itemDesc = item_desc;
        images = images;
        currentBid = current_bid;
        incBy = increment_by;
        deadline = deadline;
        highestBidder = highest_bidder;
    }

    function bid(uint amount) public {
        require (amount > current_bid);
        require (now < deadline);
        current_bid = amount;
        highest_bidder = msg.sender;
    }
}