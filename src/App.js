import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Manufacturer from "./components/Manufacturer";
import NavBar from "./components/NavBar";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [viewCartItems, setViewCartItems] = useState(false);
  const viewCartItemsHandler = () => {
    setViewCartItems(!viewCartItems);
  };

  return (
    <Router>
      <div className="w-screen h-screen text-black font-Playfair px-2.5 flex flex-col justify-between overflow-x-hidden md:max-w-md md:m-auto">
        <div className="relative">
          <NavBar
            cartItems={cartItems}
            viewCartItemsHandler={viewCartItemsHandler}
          />
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  viewCartItems={viewCartItems}
                  setViewCartItems={setViewCartItems}
                />
              }
            />
            <Route path="verifyProduct/*" element={<Manufacturer />} />
          </Routes>
        </div>
        <footer className=" w-full p-2.5  text-center  text-sm  ">
          <p className=" md:mb-7">
            &copy; {new Date().getFullYear()} Intermezzi from Interphase
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
