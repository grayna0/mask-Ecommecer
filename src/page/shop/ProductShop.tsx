import React, { useContext, useEffect, useState } from "react";

import "./productshop.scss";

import TableProduct from "../../compoents/tableproduct/TableProduct";
import { ProductContext } from "../../compoents/layout/Index";
import { Product } from "../admin/Admin";


const ShopProducts = () => {
  const productContext = useContext(ProductContext);
  const [productCateList, setProductCateList] = useState<Product[]>([]);

  useEffect(() => {
    setProductCateList(productContext.products);
    
  }, [productContext.products]);

  const categoryList = [
    ...new Set(productContext.products.map((item: any) => item.category)),
  ];

  const getProductList = (i: string) => {
    const itemList = productContext.products.filter(
      (item: Product) => item.category === i
    );
    setProductCateList(itemList);
  };

  return (
    <div className="shop container-pg ">
      <div className="banner-shop ">banner</div>
      <div className="wrap-product">
        <div className="sidebar">
          <ul className="cate-list">
            {categoryList.map((i: any) => {
              if (i !== undefined) {
                return <li onClick={() => getProductList(i)}>{i}</li>;
              }
            })}
            <li onClick={() => setProductCateList(productContext.products)}>
              All
            </li>
          </ul>
         
        
        </div>

        <TableProduct productData={productCateList} showaddToCart={true} />
      </div>
    </div>
  );
};

export default ShopProducts;
