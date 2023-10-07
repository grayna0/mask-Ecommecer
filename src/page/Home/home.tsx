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
import Question from "../../compoents/question/Question";
import CountDown from "../../compoents/countdown/CountDown";
import { useDispatch, useSelector } from "react-redux";
import { getTimeCountDown } from "../../store/slice/countdownSlice";
import Aboutus from "../../compoents/slide/Aboutus";
export const tableStyle: CSSProperties = {
  justifyContent: "center",
};
const Home = () => {
  const productsContext = useContext(ProductContext);
  const [relateProduct, setRelaPro] = useState<Product[]>([]);
  const { date } = useSelector((state: any) => state.countDown);
  const dispatch = useDispatch();

  useEffect(() => {
    if (date > 0) {
      // @ts-ignore
      dispatch(getTimeCountDown());
    }
    return;
  }, []);
  useEffect(() => {
    filterBestProduct();
    
    
    return;
  }, [productsContext.products]);
  const filterBestProduct = () => {
    const bestProduct = productsContext.products.filter(
      (item: Product) => item.star === 5
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
      {date > 0 && <CountDown />}
      <div className="test">
        
      <TableProduct
        style={tableStyle}
        productData={productsContext.products}
        showaddToCart={false}
        showErrorSreach={true}
      />
      </div>
      <div className="section-4 container-pg flex">
      
          <Aboutus />
    
      
          <Question />
     
      </div>
    </>
  );
};

export default Home;

const RelateProduct = ({ productData }: { productData: Product[] }) => {
  const [prev, setPrev] = useState<number>(0);
  const [hide, setHide] = useState<number>(1);
  const activeImg=document.querySelector(".active")
  const effectUp=document.querySelectorAll(".effect")
  console.log(effectUp);
  
  // useEffect(() => {
  //   const slideAutos=  setInterval(() =>{
  //     handleChageSlide("prev")
  //     },6000)
    
  //   return () => clearInterval(slideAutos);
  // },[prev])
  const handleChageSlide = (agrs:string) => {
    activeImg?.classList.remove("active")
    effectUp[0]?.classList.remove("effect-upt")
    effectUp[1]?.classList.remove("effect-up-05s")
    effectUp[2]?.classList.remove("effect-up-3s")
    effectUp[3]?.classList.remove("effect-up-4s")
    effectUp[4]?.classList.remove("effect-up-5s")
    setTimeout(()=>{
      activeImg?.classList.add("active")   
      effectUp[0]?.classList.add("effect-upt")
      effectUp[1]?.classList.add("effect-up-05s")
      effectUp[2]?.classList.add("effect-up-3s")
      effectUp[3]?.classList.add("effect-up-4s")
      effectUp[4]?.classList.add("effect-up-5s")
      if(agrs ==="prev"){

        prev <= 0 ? setPrev(productData.length - 1) : setPrev((prev) => prev - 1);
        hide >= productData.length - 1 ? setHide(0): setHide((hide) => hide + 1 )
      }else if(agrs ==="next"){
        prev >= productData.length - 1 ? setPrev(0) : setPrev((prev) => prev + 1);
        hide <= 0 ? setHide(productData.length - 1): setHide((hide) => hide - 1 )
      }
    },100)


  };


  return (
    <div className="section-1">
      
      <h2 className="title">BEST PRODUCT</h2>
      <div className="content flex ">
        <FcPrevious
          className="icon"
          style={{ width: "50", height: "50" }}
          onClick={()=>handleChageSlide("prev")}
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
          <img className="active" src={`/${productData[prev]?.img}`} alt="asdfasdf" />
  
        </div>
        <div className="content-right">
          <h2 className="product-title effect effect-upt ">{productData[prev]?.title}</h2>
          <h2 className="effect effect-up-05s">{productData[prev]?.star}</h2>
          <h2 className="price effect effect-up-3s ">
            Price:{" "}
            <span style={{ color: "red" }}>{productData[prev]?.price}$</span>
          </h2>
          <p className="description  effect effect-up-4s">
            {productData[prev]?.description.slice(0, 250)}...
          </p>
          <div className="flex product-button  effect effect-up-5s">
            <button className="button-shop">
              <Link to="/shop">Shop</Link>
            </button>
            <button  >
              <Link to={`/product/${productData[prev]?.title}`} className="add-to-cart">View more</Link>
            </button>
          </div>
        </div>
        <FcNext
          className="icon"
          style={{ width: "50", height: "50" }}
          onClick={()=>handleChageSlide("next")}
        />
      </div>
    </div>
  );
};

