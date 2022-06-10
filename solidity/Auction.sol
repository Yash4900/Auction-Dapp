pragma solidity 0.5.4;

contract Auction {
    Item[] public items;

    function startAuction(string memory _item_name, string memory _item_desc, string memory _images, uint _item_baseprice, uint _increment_by, uint _deadline) public {
        Item item = new Item(_item_name, _item_desc, _images, _item_baseprice, _increment_by, _deadline, msg.sender);
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
    uint baseprice;
    uint current_bid;
    uint increment_by;
    uint deadline;
    address payable highest_bidder;
    address owner;
    mapping (address => uint) public bidders;
    bool amount_claimed;
    
    constructor (string memory _item_name, string memory _item_desc, string memory _images, uint _item_baseprice, uint _increment_by, uint _deadline, address _owner) public {
        item_name = _item_name;
        item_desc = _item_desc;
        images = _images;
        baseprice = _item_baseprice;
        current_bid = 0;
        increment_by = _increment_by;
        deadline = _deadline;
        owner = _owner;
        amount_claimed = false;
    }

    function getItemDetails() public view returns(string memory itemName, string memory itemDesc, string memory itemImages, uint basePrice, uint currentBid, uint incBy, uint itemDeadline, address highestBidder, address itemOwner, bool amountClaimed) {
        itemName = item_name;
        itemDesc = item_desc;
        itemImages = images;
        basePrice = baseprice;
        currentBid = current_bid;
        incBy = increment_by;
        itemDeadline = deadline;
        highestBidder = highest_bidder;
        itemOwner = owner;
        amountClaimed = amount_claimed;
    }

    function bid(uint amount) payable public {
        require (amount > current_bid);
        require (now < deadline);
        if (current_bid != 0) {
            highest_bidder.transfer(current_bid);
        }
        current_bid = amount;
        highest_bidder = msg.sender;
        bidders[msg.sender] = amount;
    }

    function claimAmount() public payable {
        require(owner == msg.sender);
        require(amount_claimed == false);
        msg.sender.transfer(current_bid);
        amount_claimed = true;
    }
}