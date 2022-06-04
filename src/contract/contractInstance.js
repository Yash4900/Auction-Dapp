import web3 from './web3';

const abi = [
	{
		"constant": false,
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
			}
		],
		"name": "startAuction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllAuctions",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const instance = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);

export default instance;