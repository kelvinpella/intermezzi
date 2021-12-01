import React from "react";
import Logo from "../assets/logo.svg";
import Cart from "../assets/cart.svg";

const NavBar = ({ cartItems, viewCartItemsHandler }) => {
  return (
    <div className="w-full flex items-center justify-between pt-3 mb-8 bg-white ">
      <nav>
        <div className="inline-block m-auto align-middle">
          <img src={Logo} alt="logo" />
        </div>
      </nav>
      <nav className="pr-px ">
        <div className="inline-block   align-middle relative">
          <img src={Cart} alt="cart" />
          {cartItems.length > 0 && (
            <div
              onClick={viewCartItemsHandler}
              className="w-full h-full absolute top-0 left-0  z-10"
            >
              <span className="absolute    border-white border -top-1.5 -right-0.5 bg-red-600 rounded-full w-4 h-4 z-20"></span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
