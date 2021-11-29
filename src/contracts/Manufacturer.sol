// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

contract Manufacturer {
    address public manufacturer;
    string stringForHashing;
    struct Product {
        string name;
        uint256 price;
    }
    RetailStore[] retailStores;
    mapping(bytes32 => Product) public products;
    mapping(bytes32 => address) productToOwner;

    // @notice productId hashing function
    function productHash(string memory name) public view returns (bytes32) {
        return keccak256(abi.encode(name, stringForHashing));
    }

    // @notice manufacturer stores all products
    constructor(
        Product[] memory _incomingProducts,
        string memory _HashingString
    ) {
        manufacturer = msg.sender;
        stringForHashing = _HashingString;
        for (uint256 i = 0; i < _incomingProducts.length; i++) {
            bytes32 hashedName = productHash(_incomingProducts[i].name);
            products[hashedName] = _incomingProducts[i];
        }
    }

    // @notice Retail Stores buy products from manufacturer here & attain ownership of the product
    function buyProductFromManufacturer(string memory _product)
        external
        payable
    {
        Product memory product = products[productHash(_product)];
        uint256 price = product.price;
        require(msg.value >= price);
        productToOwner[productHash(_product)] = msg.sender;

    }

    function newRetailStore() external {
        retailStores.push(new RetailStore(msg.sender));
    }

    //@notice will be called when an individual buys product from store
    function changeProductOwner(
        string memory _productName,
        address _oldOwner,
        address _newOwner
    ) external {
        require(_oldOwner == productToOwner[productHash(_productName)]);
        productToOwner[productHash(_productName)] = _newOwner;
    }

    function viewOwner(string memory productName)
        external
        view
        returns (address)
    {
        return productToOwner[productHash(productName)];
    }

    function viewProductPrice(string memory _productName)
        external
        view
        returns (uint256)
    {
        return products[productHash(_productName)].price;
    }

    function getRetailStores() external view returns (RetailStore[] memory) {
        RetailStore[] memory _retailStores = retailStores;
        return _retailStores;
    }
}

contract RetailStore {
    address owner;

    constructor(address _owner) {
        owner = _owner;
    }

    //@notice individual buys product from retail store
    function buyProductFromRetailStore(
        Manufacturer _manufacturer,
        string memory _productName
    ) external payable {
        require(_manufacturer.viewOwner(_productName) == owner);
        require(msg.value >= _manufacturer.viewProductPrice(_productName));
        _manufacturer.changeProductOwner(_productName, owner, msg.sender);
    }
}
