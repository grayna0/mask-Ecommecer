

import "./App.scss";
import "./styles/comon.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./page/about-us/About";
import Checkout from "./page/cart/Checkout";
import ShopCart from "./page/cart/ShopCart";
import ShopProducts from "./page/shop/ProductShop";
import Layout from "./layout/Index";
import Home from "./page/Home/home";
import Admin from "./page/admin/Admin";

import Products from "./page/admin/products/Products";
import Login from "./page/loginUsers";
import PgSProduct from "./page/productSingePage/PgSProduct";
import { ProductSingle } from "./page/admin/product/Product";

import store from "./store/store";
import AdminCountDown from "./page/admin/Calendar/AdminCountDown";
import { useEffect } from "react";
import { loginAcount } from "./store/slice/authSlice";
import useLocalStorage from "./hook/useLocalStorage";
import UserPage from "./page/user/UserPage";
import { Provider } from 'react-redux';

function App() {
  const { getLocalItem } = useLocalStorage();
  const userLocalStorage = getLocalItem("user");

  useEffect(() => {
    if (userLocalStorage) {
      store.dispatch(loginAcount(userLocalStorage));
    }
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<ShopProducts />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<ShopCart />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:title" element={<PgSProduct />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<Admin />}>
          
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/product/:id" element={<ProductSingle />} />
            <Route path="/admin/calendar" element={<AdminCountDown />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
