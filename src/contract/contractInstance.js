import web3 from './web3';

const abi = [];

const instance = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);

export default instance;