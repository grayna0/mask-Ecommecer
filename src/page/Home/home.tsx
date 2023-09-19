import React, { useState, useContext, useEffect, CSSProperties } from "react";

import "./home.scss";
import Banner from "../../compoents/slide/Banner";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Product } from "../admin/Admin";
import { ProductContext } from "../../compoents/layout/Index";
import { Link } from "react-router-dom";
import Boxs from "../../compoents/box/Box";
import Ball from "../../compoents/ball/Ball";
import TableProduct from "../../compoents/tableproduct/TableProduct";
const RelateProduct = ({ productData }: { productData: Product[] }) => {
  const [prev, setPrev] = useState<number>(0);
  const handlePrev = () => {
    prev <= 0 ? setPrev(productData.length - 1) : setPrev((prev) => prev - 1);
  };
  const handleNext = () => {
    prev >= productData.length - 1 ? setPrev(0) : setPrev((prev) => prev + 1);
  };
  return (
    <div className="section-1">
      <h2 className="title">BEST PRODUCT</h2>
      <div className="content flex ">
        <FcPrevious
          className="icon"
          style={{ width: "50", height: "50" }}
          onClick={handlePrev}
        />
        <div className="content-left flex">
          <Ball
            width={400}
            height={400}
            x={10}
            y={0}
            dur={2}
            nameAnimation="jumpX"
          />
          <img src={`/${productData[prev]?.img}`} alt="asdfasdf" />
        </div>
        <div className="content-right">
          <Ball
            width={200}
            height={200}
            x={70}
            y={-100}
            dur={3}
            nameAnimation="jumpY"
          />
          <h2 className="product-title">{productData[prev]?.title}</h2>
          <h2>{productData[prev]?.star}</h2>
          <h2 className="price">
            Price:{" "}
            <span style={{ color: "red" }}>{productData[prev]?.price}$</span>
          </h2>
          <p className="description">
            {productData[prev]?.description.slice(0, 250)}...
          </p>
          <div className="flex product-button">
            <button>
              <Link to=""></Link>Shop
            </button>
            <button>
              <Link to=""></Link>View more
            </button>
          </div>
        </div>
        <FcNext
          className="icon"
          style={{ width: "50", height: "50" }}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
export const tableStyle: CSSProperties = {
   justifyContent: "center",
 };
const Home = () => {
  const productsContext = useContext(ProductContext);
  const [relateProduct, setRelaPro] = useState<Product[]>([]);

  useEffect(() => {
    tesstert();
    return;
  }, [productsContext.products]);
  const tesstert = () => {
    const test = productsContext.products.filter(
      (item: Product) => item.star === 5
    );
    setRelaPro(test);
  };

  return (
    <>
      <Banner />
      <div className="flex box-cate">
        <Boxs />
      </div>
      <RelateProduct productData={relateProduct} />
      <TableProduct
        style={tableStyle}
        productData={productsContext.products}
        showaddToCart={false}
      />
    </>
  );
};

export default Home;
