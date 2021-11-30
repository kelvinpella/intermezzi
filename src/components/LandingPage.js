import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../products";
import { web3 } from "../web3";
const compiledRetailStore = require("../compiledContracts/RetailStore.json");
const retailStoreAbi = compiledRetailStore.abi;
const LandingPage = ({
  cartItems,
  setCartItems,
  viewCartItems,
  setViewCartItems,
}) => {
  const [buyItem, setBuyItem] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const addToCartHandler = (product) => {
    setCartItems(
      cartItems.filter((item) => item.name !== product.name).concat(product)
    );
  };
  const removeCartItemHandler = (id) => {
    if (cartItems.length === 1) {
      setViewCartItems(false);
    }
    setCartItems(cartItems.filter((curr, idx) => idx !== id));
  };

  // buy one item at a time
  const transactionHandler = async (product) => {
    setBuyItem(true);
    setLoading(true);
    setMessage("Transaction in progress ... ");
    const accounts = await web3.eth.getAccounts();
    const manufacturerAddress = "0xa2b462f7bdb534faf0c1e51b1340fa40d63fcd7d";
    const retailStoreAddress = "0x34774073fa944A08C734D915f6ED8F5Aaf7fC5F8";
    const retailStoreContract = await new web3.eth.Contract(
      retailStoreAbi,
      retailStoreAddress
    );
    let receipt;
    try {
      receipt = await retailStoreContract.methods
        .buyProductFromRetailStore(manufacturerAddress, product.name)
        .send({ from: accounts[1], value: product.price, gas: 500000 });
      setLoading(false);
      setMessage(`Success!! Receipt - ${receipt.transactionHash}`);
    } catch (error) {
      setLoading(false);
      setMessage("Transaction Failed!! This item is already sold.");
      console.log(error);
    }
  };
  const buyProduct = (product = null) => {
    // single product
    if (product) {
      transactionHandler(product);
      setCartItems([]);
      return;
    }
    // cart items
    for (let i = 0; i < cartItems.length; i++) {
      transactionHandler(cartItems[i]);
    }
    setCartItems([]);
  };
  return (
    <div className="w-full ">
      <div className="w-full bg-cover h-48 relative mb-10">
        <h1 className=" bg-white  max-w-40 p-2.5 m-2.5 absolute bottom-0 right-0 uppercase font-bold text-xl ">
          This season's latest
        </h1>
      </div>
      <h2 className=" w-full  my-6  text-sm font-WorkSans  overflow-ellipsis overflow-hidden">
        <span className="  font-bold  "> Store ID:</span>{" "}
        0x5B4EB8BEE7BE68d39E338e8c50711555A2Bbd2c2
      </h2>
      <div className="  w-full flex products-center justify-between flex-wrap mb-3 ">
        {(!viewCartItems || cartItems.length === 0) &&
          !buyItem &&
          products.map((product, index) => (
            <div className=" text-center max-w-50  mb-8" key={index}>
              <div className="w-4/5  m-auto  ">
                <img src={product.image} alt="bag" className=" w-full " />
              </div>
              <h2 className="   m-3  text-lg capitalize">{product.name}</h2>
              <p className="   m-3 font-bold text-base font-WorkSans">
                ${product.price}
              </p>

              <button
                onClick={() => buyProduct(product)}
                className=" bg-black text-white py-2.5 px-4 uppercase mb-3 font-WorkSans text-sm "
              >
                buy now
              </button>
              <button
                onClick={() => addToCartHandler(product)}
                className=" bg-gray-200 text-black py-2.5 px-4 mb-3  uppercase   font-WorkSans text-sm "
              >
                add to cart
              </button>
              <Link
                to={`/verifyProduct/${product.name}`}
                className="  text-black  block mb-2.5  font-WorkSans text-sm "
              >
                Is product genuine?
              </Link>
              <hr className="  border-black max-w-70 m-auto" />
            </div>
          ))}
        {viewCartItems && cartItems.length > 0 && (
          <div className=" w-full p-3 rounded-t-2xl  bg-white border border-gray-500   ">
            <h2 className="  w-full my-6 font-bold text-2xl capitalize text-center">
              Shopping Cart
            </h2>
            {cartItems.map((item, index) => (
              <div className="  w-full  mb-8" key={index}>
                <div className="inline-block w-1/3  mx-6 align-middle  ">
                  <img src={item.image} alt="bag" className=" w-full " />
                </div>
                <div className="inline-block align-middle">
                  <h2 className="  w-full my-3  text-lg capitalize">
                    {item.name}
                  </h2>
                  <p className=" w-full  my-3 font-bold text-base font-WorkSans">
                    ${item.price}
                  </p>
                  <h3
                    onClick={() => removeCartItemHandler(index)}
                    className="w-full  uppercase mb-2 font-WorkSans text-sm underline"
                  >
                    remove
                  </h3>
                </div>
              </div>
            ))}
            <button
              onClick={() => buyProduct()}
              className="w-full bg-black text-white py-2.5 mb-3  uppercase  mx-auto font-WorkSans text-sm "
            >
              buy now
            </button>
            <button
              onClick={() => setViewCartItems(false)}
              className=" w-full bg-gray-200 text-black py-2.5  uppercase  mx-auto font-WorkSans text-sm "
            >
              Back to shopping
            </button>
          </div>
        )}
        {buyItem && (
          <div className=" w-full p-3 rounded-t-2xl  bg-white border border-gray-500   ">
            {loading ? (
              <h1 className="  w-full my-6  text-xl  text-center">
                Transaction in progress ...
              </h1>
            ) : (
              <>
                <h1 className=" text-center w-full  my-2  text-sm font-WorkSans  overflow-ellipsis overflow-hidden">
                  {message}
                </h1>
                <button
                  className="w-full bg-black text-white py-2.5 mb-3  uppercase  mx-auto font-WorkSans text-sm "
                  onClick={() => setBuyItem(false)}
                >
                  Ok
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
