const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const { initialManufacturerArgs } = require("../manufacturerProducts");
const { retailBuysProducts } = require("../retailBuysProducts");
const compiledManufacturer = require("../compiledContracts/Manufacturer.json");
const compiledRetailStore = require("../compiledContracts/RetailStore.json");
const manufacturerAbi = compiledManufacturer.abi;
const manufacturerBytecode = compiledManufacturer.evm.bytecode.object;
const retailStoreAbi = compiledRetailStore.abi;
const web3 = new Web3(ganache.provider());

let accounts;
let manufacturer;
let individualOwner;
let storeOwner;
let retailStoreAddress;
let retailStoreContract;
beforeEach(async () => {
  // set account
  accounts = await web3.eth.getAccounts();

  manufacturer = await new web3.eth.Contract(manufacturerAbi)
    .deploy({
      data: manufacturerBytecode,
      arguments: [initialManufacturerArgs, "hello"],
    })
    .send({ from: accounts[0], gas: 3000000 });

  for (let i = 0; i < retailBuysProducts.length; i++) {
    await manufacturer.methods
      .buyProductFromManufacturer(retailBuysProducts[i].name)
      .send({
        from: accounts[1],
        value: retailBuysProducts[i].price + 1,
        gas: 600000,
      });
  }

  await manufacturer.methods
    .newRetailStore()
    .send({ from: accounts[1], gas: 3000000 });
  storeOwner = await manufacturer.methods.viewOwner("DIVINA").call();

  [retailStoreAddress] = await manufacturer.methods.getRetailStores().call();
  retailStoreContract = await new web3.eth.Contract(
    retailStoreAbi,
    retailStoreAddress
  );
  await retailStoreContract.methods
    .buyProductFromRetailStore(manufacturer.options.address, "DIVINA")
    .send({ from: accounts[2], value: 140, gas: 3000000 });
  individualOwner = await manufacturer.methods.viewOwner("DIVINA").call();
});

describe("Manufacturer", () => {
  it("Deploys a contract", () => {
    assert.ok(manufacturer.options.address);
  });
  it("Retail Store can buy from manufacturer", () => {
    assert.strictEqual(accounts[1], storeOwner);
  });

  it("Creates a new contract - RetailStore", () => {
    assert.ok(retailStoreContract.options.address);
  });
  it("Individual can buy from Retail Store", () => {
    assert.strictEqual(accounts[2], individualOwner);
  });
});
