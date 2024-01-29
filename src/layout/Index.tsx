import { Container } from "@mui/material";
import Header from "../compoents/header/Header";
import { Outlet } from "react-router-dom";

import  { useEffect, useState ,createContext} from "react";
import { Product } from "../page/admin/Admin";
import Footer from "../compoents/footer/Footer";
import { useSelector } from "react-redux";
import { api } from "../services/Api";
import { ToastContainer } from "react-toastify";

export const ProductContext=createContext<any>(undefined)
const Layout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const checkoutSuccees = useSelector((state: any) => state.addToCart.checkoutSuccees);


  const pageList=products.map(product =>product.category)
  useEffect(() => {
    
     getData()
  },[checkoutSuccees]);
  const getData = async () => {
    try {
      const response = await api.get(`/products`);
      const jsonData = response.data;
      
      setProducts(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container disableGutters={true} maxWidth={false} >
      <Container maxWidth="lg">
        <Header />
      </Container>
      <Container className="container" maxWidth={false} style={{ padding: "0" }}>
        <ProductContext.Provider value={{products}}>

        <Outlet  />
        </ProductContext.Provider>
        <Footer pageList={pageList}/>
    
      </Container>
      <ToastContainer
        position= "bottom-right"
        autoClose= {8000}
        pauseOnHover= {true}
        draggable= {true}
        theme= "dark"/>
    </Container>
  );
};

export default Layout;
