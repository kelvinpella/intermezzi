import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { web3 } from "../web3";

const compiledManufacturer = require("../compiledContracts/Manufacturer.json");
const manufacturerAbi = compiledManufacturer.abi;

const Manufacturer = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  let name = useParams();

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const verifyProduct = async () => {
    if (!value) {
      return;
    }
    const valueCopy = value.toUpperCase();
    setLoading(true);
    setMessage("");
    let owner;
    const manufacturerAddress = "0xa2b462f7bdb534faf0c1e51b1340fa40d63fcd7d";
    const manufacturerContract = await new web3.eth.Contract(
      manufacturerAbi,
      manufacturerAddress
    );
    const hash = await manufacturerContract.methods
      .productHash(valueCopy)
      .call();
    const product = await manufacturerContract.methods.products(hash).call();

    if (product.name) {
      owner = await manufacturerContract.methods.viewOwner(valueCopy).call();
      setLoading(false);
      if (owner === "0x0000000000000000000000000000000000000000") {
        setMessage("This product is genuine but it's NOT at any store!");
      } else {
        setMessage(`This product is genuine. Currently owned by: ${owner}`);
      }
    } else {
      setLoading(false);
      setMessage("This product is NOT genuine!");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    setValue(name["*"]);
  }, [name]);

  return (
    <div className=" absolute top-0 left-0 w-full h-full  bg-white  text-gray-900 font-WorkSans">
      <h1 className="my-10 text-center text-lg font-bold ">
        This page represents Manufacturer's website.
      </h1>
      <hr className="  border-black mb-10" />
      <label htmlFor="input" className="font-bold text-sm  block">
        Verify Product:
      </label>
      <input
        type="text"
        value={value}
        onChange={inputChangeHandler}
        id="input"
        ref={inputRef}
        placeholder="Product name"
        className="border border-gray-400 mr-4 my-4 py-2.5 px-4 max-w-full focus:outline-none  focus:border-black"
      ></input>
      <button
        onClick={verifyProduct}
        className=" bg-black text-white py-2.5 px-4 uppercase mb-3 font-WorkSans text-sm "
      >
        Verify
      </button>
      <div className="w-full">
        {loading && (
          <h1 className=" text-black w-full my-6  text-xl  text-center">
            Verifying Product ...
          </h1>
        )}
        {!!message && (
          <>
            <h1 className=" text-center w-full  my-2  text-sm font-WorkSans  overflow-ellipsis overflow-hidden">
              {message}
            </h1>
            <button className="w-full bg-black text-white py-2.5 mb-3  uppercase  mx-auto font-WorkSans text-sm ">
              <Link to="/">Ok</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Manufacturer;
