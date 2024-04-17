import { useState } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Product } from "../../page/admin/Admin";
import Ball from "../ball/Ball";
import { Link } from "react-router-dom";


const  RelateProduct = ({ productData }: { productData: Product[] }) => {
    const [prev, setPrev] = useState<number>(0);
    const [hide, setHide] = useState<number>(1);
    const activeImg=document.querySelector(".active")
    const effectUp=document.querySelectorAll(".effect")
  
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
        
        <h2 className="title-section title">BEST PRODUCT</h2>
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
            <img className="active" src={productData[prev]?.img} alt="asdfasdf" />
    
          </div>
          <div className="content-right">
            <h2 className="product-title effect effect-upt ">{productData[prev]?.title}</h2>
            <h2 className="effect effect-up-05s">{productData[prev]?.star.rating}</h2>
            <h2 className="price effect effect-up-3s ">
              Price:{" "}
              <span style={{ color: "red" }}>{productData[prev]?.price}$</span>
            </h2>
            <p className="description  effect effect-up-4s">
              {productData[prev]?.description.slice(0, 250)}...
            </p>
            <div className=" product-button  effect effect-up-5s">
  
            
                <Link to={`/product/${productData[prev]?.title}`}>
                  <button  className="style-button">
                     <span className="text">View more</span>
                     <span className="after"><BiRightArrowCircle /></span>
                  </button>
                </Link>
             
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
  export default RelateProduct