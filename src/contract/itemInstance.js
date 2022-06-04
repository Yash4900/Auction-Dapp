import web3 from './web3';

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "bid",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "claimAmount",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_item_name",
        "type": "string"
      },
      {
        "name": "_item_desc",
        "type": "string"
      },
      {
        "name": "_images",
        "type": "string"
      },
      {
        "name": "_item_baseprice",
        "type": "uint256"
      },
      {
        "name": "_increment_by",
        "type": "uint256"
      },
      {
        "name": "_deadline",
        "type": "uint256"
      },
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "bidders",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getItemDetails",
    "outputs": [
      {
        "name": "itemName",
        "type": "string"
      },
      {
        "name": "itemDesc",
        "type": "string"
      },
      {
        "name": "images",
        "type": "string"
      },
      {
        "name": "currentBid",
        "type": "uint256"
      },
      {
        "name": "incBy",
        "type": "uint256"
      },
      {
        "name": "deadline",
        "type": "uint256"
      },
      {
        "name": "highestBidder",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};