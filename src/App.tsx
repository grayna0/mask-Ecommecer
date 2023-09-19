import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import About from "./page/about-us/About";
import Cart from "./page/cart/Cart";
import Checkout from "./page/Checkout";
import ShopProducts from "./page/shop/ProductShop";
import Layout from "./compoents/layout/Index";
import Login from "./page/Login";
import Home from "./page/Home/home";
import "./App.scss";
import "./styles/comon.scss";
import Admin from "./page/admin/Admin";
import Users from "./page/admin/users/Users";

import Dashboard from "./page/admin/dashboard/Dashboard";
import Products from "./page/admin/products/Products";
import { ProductSingle } from "./page/admin/product/Product";
import User from "./page/admin/user/User";
import PgSProduct from "./page/productSingePage/PgSProduct";
import { Provider } from "react-redux";
import store from "./store/store";


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout /> } >
          <Route index element={<Home />} />
          <Route path="/shop" element={<ShopProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:title" element={<PgSProduct />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/product/:id" element={<ProductSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
