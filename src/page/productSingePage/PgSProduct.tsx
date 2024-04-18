/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../layout/Index";
import "./PgSProduct.scss";
import Descreption from "./Descreption";
import TableProduct from "../../compoents/tableproduct/TableProduct";
import { Product } from "../admin/Admin";

const PgSProduct = () => {
  const { title } = useParams();
  const productContext = useContext(ProductContext);
  const [productDetail,setProductClone]=useState<Product| null>(null)

  
  const productid = productContext.products.find(
    (item: any) => item.title === title
  );
  const productSame = productContext.products.filter(
    (item: any) => item.category === productid.category
  );
  useEffect(() =>{
    handleUserListComment()
}
,[productid])

const handleUserListComment = () => {
    setProductClone(productid)
}

  return (
    <>
      <div className="container-pg">
        <div className="title-lg">
          <h1>
            <span style={{ color: "red" }}>{productid?.title}</span>/
            {productid?.category}
          </h1>
        </div>
        <div className="banner-product" id="banner-product">
          <img
            className="banner-product-img"
            src={`${productid?.img}`}
            alt=""
          />
        </div>
       <Descreption product={productDetail ? productDetail  : productid }/>
       <div className="my-16 same-product">
       <h2>MAY BE YOU LIKE</h2>
       
       <TableProduct productData={productSame.slice(0,3)} showaddToCart={false} showErrorSreach={false}   nofound={true}/>
       </div>
      </div>
    </>
  );
};

export default PgSProduct;
