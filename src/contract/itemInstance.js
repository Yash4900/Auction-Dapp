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
		"payable": true,
		"stateMutability": "payable",
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
				"name": "itemImages",
				"type": "string"
			},
			{
				"name": "basePrice",
				"type": "uint256"
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
				"name": "itemDeadline",
				"type": "uint256"
			},
			{
				"name": "highestBidder",
				"type": "address"
			},
			{
				"name": "itemOwner",
				"type": "address"
			},
			{
				"name": "amountClaimed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
	}
];

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};