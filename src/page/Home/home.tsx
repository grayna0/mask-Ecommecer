import  { useState, useContext, useEffect, CSSProperties } from "react";
import "./home.scss";
import Banner from "../../compoents/slide/Banner";
import { Product } from "../admin/Admin";
import { ProductContext } from "../../layout/Index";
import Boxs from "../../compoents/box-Category/Box";
import TableProduct from "../../compoents/tableproduct/TableProduct";
import Question from "../../compoents/question/Question";
import Aboutus from "../../compoents/slide/Aboutus";
import RelateProduct from "../../compoents/product/RalateProduct";
export const tableStyle: CSSProperties = {
  justifyContent: "center",
};
const Home = () => {
  const productsContext = useContext(ProductContext);
  const [relateProduct, setRelaPro] = useState<Product[]>([]);
  useEffect(() => {
    filterBestProduct();
    return;
  }, [productsContext.products]);
  const filterBestProduct = () => {
    const bestProduct = productsContext.products.filter(
      (item: Product) => item.star?.rating === 5
    );
    setRelaPro(bestProduct);
  };
  return (
    <>
      <Banner />
      <div className="flex box-cate">
        <Boxs />
      </div>
      <RelateProduct productData={relateProduct} />
      <div className="test">
        <h2
          className="title-section"
          style={{ textAlign: "center", color: "white" }}
        >
          RELATED PRODUCT
        </h2>
        <TableProduct
          style={tableStyle}
          productData={productsContext.products.slice(0,8)}
          showaddToCart={true}
          showErrorSreach={false}
          nofound={true}
        />
      </div>
      <div className="section-4 container-pg flex items-center">
        <div>
          <h2 className=""> About Us</h2>
          <Aboutus />
        </div>
        <Question />
      </div>
    </>
  );
};

export default Home;
