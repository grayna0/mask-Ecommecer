import Navbar from "./compoent/navbar/Navbar";
import "./admin.scss";
import { Container } from "@mui/material";
import Menu from "./compoent/menu/Menu";
import { Outlet } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { api } from "../../services/Api";


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
      const response = await api.get(`/products`);
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
  img: string;
  title: string;
  color: string[];
  producer: string;
  price: number;
  sale: number;
  createdAt: string;
  inStock: boolean;
  description: string;
  quantity:number;
  star:{
    totalStars: number;
    rating: number;
    totalUserVote: number;
  },
  category:string,
  comment:{
    user:string;
    img:string;
    comment:string;
    date:number;
    voteStar:number
  }[]
}
export default Admin;
