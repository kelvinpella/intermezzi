const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config();

const { initialManufacturerArgs } = require("./manufacturerProducts");
const { retailBuysProducts } = require("./retailBuysProducts");
const compiledManufacturer = require("./compiledContracts/Manufacturer.json");
const compiledRetailStore = require("./compiledContracts/RetailStore.json");
const manufacturerAbi = compiledManufacturer.abi;
const manufacturerBytecode = compiledManufacturer.evm.bytecode.object;
const retailStoreAbi = compiledRetailStore.abi;

// let provider = new HDWalletProvider({
//   mnemonic: process.env.MNEMONIC,
//   providerOrUrl: process.env.INFURA,
// });

// const web3 = new Web3(provider);
// let accounts;
// let manufacturer;
// const deploy = async () => {
//   accounts = await web3.eth.getAccounts();
//   manufacturer = await new web3.eth.Contract(manufacturerAbi)
//     .deploy({
//       data: manufacturerBytecode,
//       arguments: [initialManufacturerArgs, "hello"],
//     })
//     .send({ from: accounts[0], gas: 3000000 });
//   console.log("Manufacturer Address: ", manufacturer.options.address);
// };
// deploy();
console.log(process.env.INFURA);
