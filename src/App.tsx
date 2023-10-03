
import "./App.scss";
import "./styles/comon.scss";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import About from "./page/about-us/About";
import Checkout from "./page/cart/Checkout";
import ShopCart from "./page/cart/ShopCart";
import ShopProducts from "./page/shop/ProductShop";
import Layout from "./compoents/layout/Index";
import Home from "./page/Home/home";
import Admin from "./page/admin/Admin";
import Users from "./page/admin/users/Users";
import Dashboard from "./page/admin/dashboard/Dashboard";
import Products from "./page/admin/products/Products";
import Login from "./page/loginUsers";
import User from "./page/admin/user/User";
import PgSProduct from "./page/productSingePage/PgSProduct";
import { ProductSingle } from "./page/admin/product/Product";
import { Provider } from "react-redux";
import store from "./store/store";
import AdminCountDown from "./page/admin/Calendar/AdminCountDown";


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout /> } >
          <Route index element={<Home />} />
          <Route path="/shop" element={<ShopProducts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<ShopCart />} />
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
          <Route path="/admin/calendar" element={<AdminCountDown />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
