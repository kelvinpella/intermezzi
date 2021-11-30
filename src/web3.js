const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { mnemonic, infura } = require("./privateData");
let provider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl: infura,
  });
  
  export const web3 = new Web3(provider);