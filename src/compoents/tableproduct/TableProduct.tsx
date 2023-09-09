import React from "react";
import { Product } from "../../page/admin/products/Products";
import "./tableproduct.scss"
const TableProduct = ({ productData }: { productData: Product[] }) => {
  return (
    <>
        <h2 className="title-head"> CATE</h2>
    <div className="cate-product flex">
      {productData.map(item=> { 
        return (
        <div className="box-img " key={item.id}>
        <img className="img" src={`/${item.img}`} alt={`${item.img}`} />
        <h3 className="title">{item.title}</h3>
        <h3 className="price">{item.price}</h3>
      </div>
      )})}
    </div>
    </>
  );
};

export default TableProduct;
