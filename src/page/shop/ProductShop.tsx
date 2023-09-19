import React, { useContext } from "react";

import "./productshop.scss";
import { Container } from "@mui/material";
import TableProduct from "../../compoents/tableproduct/TableProduct";
import { ProductContext } from "../../compoents/layout/Index";

const ShopProducts = () => {
  const productContext=useContext(ProductContext)


  return (
    <Container className="shop" maxWidth={false}>
      <div className="banner-shop">banner</div>
      <div className="wrap-product">
        <div className="sidebar">sidebar</div>
        <div className="products-cate"></div>

        <TableProduct productData={productContext.products} showaddToCart={true}/>
      </div>
    </Container>
  );
};

export default ShopProducts;
