import { Container } from "@mui/material";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

import React, { useEffect, useState ,createContext} from "react";
import apiUrl from "../../services/Api";
import axios from "axios";
import { Products } from "../../page/admin/Admin";
import Footer from "../footer/Footer";

export const ProductContext=createContext<any>(undefined)
const Layout = () => {
  const [products, setProducts] = useState<Products[]>([]);
console.log("pro",products);

  
  useEffect(() => {
    getData()

  },[]);
  const getData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      const jsonData = response.data;
      setProducts(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container disableGutters={true} maxWidth={false}>
      <Container maxWidth="lg">
        <Header />
      </Container>
      <Container className="container" maxWidth={false} style={{ padding: "0" }}>
        <ProductContext.Provider value={{products}}>

        <Outlet />
        </ProductContext.Provider>
        <Footer/>
      </Container>
    </Container>
  );
};

export default Layout;
