import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import About from "./page/about-us/About";
import Cart from "./page/cart/Cart";
import Checkout from "./page/Checkout";
import ProductDetail from "./page/shop/ProductDetail";
import Layout from "./compoents/layout/Index";
import Login from "./page/Login";
import Home from "./page/Home/home" ;
import "./App.scss";
import "./styles/comon.scss";
import Admin from "./page/admin/Admin";
import Users from "./page/admin/users/Users";

import Dashboard from "./page/admin/dashboard/Dashboard";
import Products from "./page/admin/products/Products";
import { ProductSingle } from "./page/admin/product/Product";
import User from "./page/admin/user/User";

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
      
        </Route>
      </Routes>
      <Routes>
      <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/product/:id" element={<ProductSingle />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
