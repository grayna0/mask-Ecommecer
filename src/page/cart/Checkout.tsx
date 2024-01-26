import "./checkout.scss";
import { Link } from "react-router-dom";
import { FormOder, Oder } from "./FormOder";

const Checkout = () => {
  return (
    <>
      <h2 className="title-lg text-center py-14 my-6 bg-slate-200 text-black">
        <Link to="/" className="text-red-600">
          HOME
        </Link>
        /CHECKOUT
      </h2>
      <div className=" checkout-content">
        <FormOder />
        <Oder />
      </div>
    </>
  );
};

export default Checkout;
