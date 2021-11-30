const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { mnemonic, infura } = require("./privateData");

const { initialManufacturerArgs } = require("./manufacturerProducts");
const { retailBuysProducts } = require("./retailBuysProducts");
const compiledManufacturer = require("./compiledContracts/Manufacturer.json");
const compiledRetailStore = require("./compiledContracts/RetailStore.json");
const manufacturerAbi = compiledManufacturer.abi;
const manufacturerBytecode = compiledManufacturer.evm.bytecode.object;
const retailStoreAbi = compiledRetailStore.abi;

let provider = new HDWalletProvider({
  mnemonic: mnemonic,
  providerOrUrl: infura,
});

const web3 = new Web3(provider);
let accounts;
let retailStoreAddress;
let retailStoreContract;
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

// Retail store buys products here
const buyFromManufacturer = async () => {
  const manufacturerAddress = "0xa2b462f7bdb534faf0c1e51b1340fa40d63fcd7d";
  const manufacturerContract = await new web3.eth.Contract(
    manufacturerAbi,
    manufacturerAddress
  );
  accounts = await web3.eth.getAccounts();
  for (let i = 0; i < retailBuysProducts.length; i++) {
    await manufacturerContract.methods
      .buyProductFromManufacturer(retailBuysProducts[i].name)
      .send({
        from: accounts[0],
        value: retailBuysProducts[i].price + 1,
        gas: 3000000,
      });
  }

  await manufacturerContract.methods
    .newRetailStore()
    .send({ from: accounts[0], gas: 3000000 });

  [retailStoreAddress] = await manufacturerContract.methods
    .getRetailStores()
    .call();
  retailStoreContract = await new web3.eth.Contract(
    retailStoreAbi,
    retailStoreAddress
  );
  console.log("Store ID: ", accounts[0]);
  console.log("Retail Store Address: ", retailStoreContract.options.address);
};
buyFromManufacturer();
