import React from 'react'
import  { useEffect, useState } from 'react';
import axios from 'axios';
interface Product {
  _id: string;
  name: string;
}

const User: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
const fetchData =async () => {
  try{
    const response= await axios.get(" http://localhost:3000/products")
    const jsonData=response.data;
    setProducts(jsonData);
  
 }catch(error) {
  console.error('Lỗi khi lấy dữ liệu:', error);
 } 
}



  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
    };
    
  
  


export default User