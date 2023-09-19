import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../compoents/layout/Index";

import "./PgSProduct.scss";
import Descreption from "./Descreption";
import TableProduct from "../../compoents/tableproduct/TableProduct";

const PgSProduct = () => {
  const { title } = useParams();
  const productContext = useContext(ProductContext);
  const productid = productContext.products.find(
    (item: any) => item.title === title
  );
  const productSame = productContext.products.filter(
    (item: any) => item.category === productid.category
  );

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
            src={`/${productid?.img}`}
            alt=""
          />
        </div>
       <Descreption product={productid}/>
       <TableProduct productData={productSame} showaddToCart={false}/>
      </div>
    </>
  );
};

export default PgSProduct;
