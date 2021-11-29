const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// delete compiledContracts folder and old contents
const compiledContractsPath = path.resolve(__dirname, "compiledContracts");
fs.removeSync(compiledContractsPath);

// generate new compiledContracts folder
fs.ensureDirSync(compiledContractsPath);

// compile Manufacturer file
const manufacturerPath = path.resolve(__dirname, "contracts", "Manufacturer.sol");
const source = fs.readFileSync(manufacturerPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Manufacturer.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": { "*": ["*"] },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// write contracts to individual files in build
const contracts = output.contracts["Manufacturer.sol"];
for (let contract in contracts) {
  fs.outputJsonSync(`${compiledContractsPath}/${contract}.json`, contracts[contract]);
}
