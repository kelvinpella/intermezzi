import React from "react";
import { Link } from "react-router-dom";

import { products } from "../products";

const LandingPage = ({
  cartItems,
  setCartItems,
  viewCartItems,
  setViewCartItems,
}) => {
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

  return (
    <div className="w-full ">
      <div className="w-full bg-cover h-48 relative mb-10">
        <h1 className=" bg-white  max-w-40 p-2.5 m-2.5 absolute bottom-0 right-0 uppercase font-bold text-xl ">
          This season's latest
        </h1>
      </div>
      <div className="  w-full flex products-center justify-between flex-wrap mb-3 ">
        {(!viewCartItems || cartItems.length === 0) &&
          products.map((product, index) => (
            <div className=" text-center max-w-50  mb-8" key={index}>
              <div className="w-4/5  m-auto  ">
                <img src={product.image} alt="bag" className=" w-full " />
              </div>
              <h2 className="   m-3 font-bold text-lg capitalize">
                {product.name}
              </h2>
              <p className="   m-3 font-bold text-base font-WorkSans">
                ${product.price}
              </p>

              <button className=" bg-black text-white py-2.5 px-4 uppercase mb-3 font-WorkSans text-sm ">
                buy now
              </button>
              <button
                onClick={() => addToCartHandler(product)}
                className=" bg-gray-200 text-black py-2.5 px-4 mb-3  uppercase   font-WorkSans text-sm "
              >
                add to cart
              </button>
              <Link to="" className="  text-black  block mb-2.5  font-WorkSans text-sm ">Is product genuine?</Link>
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
                  <h2 className="  w-full my-3 font-bold text-lg capitalize">
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
            <button className="w-full bg-black text-white py-2.5 mb-3  uppercase  mx-auto font-WorkSans text-sm ">
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
      </div>
    </div>
  );
};

export default LandingPage;
