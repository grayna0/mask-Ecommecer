import React, { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { Item, checkout } from "../../store/slice/cartSlice";

import { ProductContext } from "../../compoents/layout/Index";
import { Link } from "react-router-dom";

const Checkout = () => {
  const listChose: Item[] = useSelector(
    (state: any) => state.addToCart.itemsList
  );
  const totalPrice = useSelector((state: any) => state.addToCart.totalPrice);
  const dispatch = useDispatch();
  const testcontext = useContext(ProductContext);
  const arrPro = testcontext.products;

  const checkoutOder = async () => {
    // @ts-ignore
    dispatch(checkout({ listChose, arrPro })).unwrap();
  };

  return (
    <>
   
   <h2 className="title-lg text-center py-14 my-6 bg-slate-200 text-black">
        <Link to="/" className="text-red-600">HOME</Link>/CHECKOUT
      </h2>
    <div className="container-pg flex ">
      <FormOder />
      <div className="oder">
        <h2>Oder</h2>
        <table className="w-full oder-tb">
          <tr className="oder-style-tr" >
            <td className="oder-title">Product</td>
            <td className="text-right oder-title ">Oder</td>
          </tr>

          {listChose.map((i: any) => (
            <tr  className="list-items">
              

              <td >{i.name}</td>
              <td className="text-right">x{i.quantity}</td>
              
            </tr>
          ))}
          <tr className="shipping" >
            <td className="oder-title">Shipping</td>
            <td className="text-right">FreeShipp</td>
          </tr>
          <tr className="oder-style-tr">
            <td className="oder-title">Total</td>
            <td className="text-right">{totalPrice}$</td>
          </tr>
        </table>
        <button onClick={checkoutOder}>Place Oder</button>
      </div>
    </div>
    </>
  );
};

export default Checkout;

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  adress: string;
  message:string;
};
const FormOder = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  return (
    <form className="checkout-form " onSubmit={handleSubmit(onSubmit)}>
      <h2>Billing Details</h2>
      <div className="flex gap-10">
        <label htmlFor="first-name">
          First Name <br />
          <input className="w-full" type="text" {...register("firstName")} id="first-name" />
        </label>
        <label htmlFor="last-name">
         Last Name <br />
          <input className="w-full" type="text" {...register("lastName")} id="last-name" />
        </label>
      </div>
      <div className="flex gap-10">

      <label htmlFor="email">
        Your Email <br />
        <input className="w-full" type="email" {...register("email")} id="email" />
      </label>
      <label htmlFor="phone">
        Phone Number <br />
        <input className="w-full" type="number" {...register("phone")} id="phone" />
      </label>
      </div>
      <label htmlFor="adress">
       Adress <br />
        <input className="w-full" type="text" {...register("adress")} id="adress" />
      </label>
      <label htmlFor="message">
      Message <br />
        <textarea  className="w-full h-52" {...register("message")} id="message" />
        
      </label>
      
    </form>
  );
};
