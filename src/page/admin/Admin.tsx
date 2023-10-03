import Navbar from "./compoent/navbar/Navbar";
import "../../styles/admin/admin.scss";
import { Container } from "@mui/material";
import Menu from "./compoent/menu/Menu";
import { Outlet } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import apiUrl from "../../services/Api";
import { infoUser } from "../../compoents/formLogin/FormLogin";
import Dashboard from "./dashboard/Dashboard";


export const productContext = createContext<any>(undefined);
const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [UpdateProduct, setUpdateProduct] = useState<Product | null>(null);

  


  useEffect(() => {
    fetchData();
    return
  }, [UpdateProduct]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      const jsonData = response.data;
      setProducts(jsonData);
    
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  


  return (
    <productContext.Provider
      value={{ products, setProducts, setUpdateProduct
    }}
      >
      <Container className="main" maxWidth={false}>
        <Navbar />
        <div className="contain">
          <div className="menucontain">
            <Menu />
          </div>
          <div className="contentcontain">
            <Outlet />
          </div>
        </div>
      </Container>
    </productContext.Provider>
  );
};

export interface Product {
  id: number;
  img: FileList | File[] ;
  title: string;
  color: string[];
  producer: string;
  price: number;
  sale: number;
  createdAt: string;
  inStock: boolean;
  description: string;
  quantity:number;
  star:number,
  category:string,
  comment:string[]
}
export default Admin;
