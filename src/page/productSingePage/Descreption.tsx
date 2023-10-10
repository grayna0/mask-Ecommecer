import { FaCartPlus } from "react-icons/fa";
import Question from "../../compoents/question/Question";
import { Product } from "../admin/Admin";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../services/Api";

const Descreption = ({ product }: { product: Product }) => {

  const dispatch = useDispatch();
  return (
    <>
      <div className="flex  flex-gap-20">
        <div className="flex-basic-50 lf-content ">
          <div className="Descreption bor-radius-20">
            <h2>Descreption</h2>
            <p className="decript">{product?.description.slice(0, 200)}...</p>
            <button className="button">Read More</button>
          </div>
          <DeltailProduct />
          <Question />
        </div>
        <div className="flex-basic-50 rg-content">
          <div className="price">
            <h2 className="product-price">USD {product?.price}.00</h2>
          <ShowStars  productStar={product.star} />
            
          </div>
          <div className="actions flex gap-6 ">
            <button
              className="style-button"
              onClick={() => dispatch(addToCart(product))}
            >
              <span className="text">Add to cart</span>
              <span className="after">
                <FaCartPlus />
              </span>
            </button>
            <Link to="/cart" className="style-button">
              <span className="text">Show Bag</span>
              <span className="after">
                <FaCartPlus />
              </span>
            </Link>
          </div>
        

          <RatingStars  product={product}/>
       
        </div>
      </div>
    </>
  );
};

export default Descreption;
interface userComent {
  mess:string,
}
interface Coment {
  mess:string,
}

const RatingStars  = ({product}:{product:Product}) => {
  const { register, handleSubmit } = useForm<userComent>();
  const [starSelected, setstarSelected] = useState<number>(0);

  const productClone={...product}
  const putComment = async (data:any) => {
    const ratingUpdate=productClone.comment?.map(item=>item.voteStar)
    
    const totalRatingUpdate=ratingUpdate.reduce((sum,currentRating)=>sum + currentRating,0)
    console.log(totalRatingUpdate);
    const upstar ={
      totalStars:totalRatingUpdate,
      rating: totalRatingUpdate / productClone.comment?.length,
      totalUserVote:productClone.comment?.length
    }
    const upComment ={
           user:"grayna0@gmail.com",
          img:"avatar.png",
          comment:data,
          date:"11-09-2022",
          voteStar:starSelected
    }
    await api.put(`/products/${product.id}`,{...productClone,star:upstar,comment:[...productClone.comment,upComment]})
  }
  const onSubmit: SubmitHandler<userComent> = async (data:any) => {
    console.log(111);
     putComment(data.mess)
   
  }

  const onchage= (index:number) => {
    setstarSelected(index)
    
  }
  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)}>
        <textarea  {...register("mess")} />
       <ShowStars onchange={onchage} productStar={starSelected}/>
        <input type="submit" />
      </form>
   
    </div>
  );
};
const DeltailProduct = () => {
  return (
    <>
      <div className="heighlight bor-radius-20">
        <h2>HighLights</h2>
        <div className="flex">
          <ul className="flex-basic-50">
            <li>
              <p>Controllable LED lights</p>
            </li>
            <li>
              <p>Carefully Handcrafted</p>
            </li>
            <li>
              <p>Adjustable Straps</p>
            </li>
          </ul>
          <ul className="flex-basic-50">
            <li>
              <p>Velcro Cushion Pads</p>
            </li>
            <li>
              <p>Carefully Handcrafted</p>
            </li>
            <li>
              <p>Adjustable Straps</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};



const Stars =({rating,onchange }: { rating: number,onchange?:(i:number)=>void }) => {
  const [starExists, setStarExists] = useState<number[]>([0, 0, 0, 0,0]);
  useEffect(() => {
   
     handleStarShow()
  
    
   },[]);
   const onchangeStars=(index:any)=>{
    if(onchange){
       onchange(index)
       handleSelectStar(index)
       handleSelectStar(index)
    }else{
      return
    }
   }
   const handleSelectStar = (rating:number) =>{
  const fillStar=starExists.slice(0,rating+1).fill(1)
  console.log(2,fillStar);
  
  const lastStar=starExists.slice(rating+1,6).fill(0)
  console.log(1,lastStar);

  const showStarSeletd=fillStar.concat(lastStar)
  console.log(1,showStarSeletd);

  setStarExists(showStarSeletd)
 
   }
  const handleStarShow=()=>{
    let starsFirst
    let starLast
    if(rating){
      starsFirst=Math.floor(rating)
      starLast = (rating -starsFirst).toFixed(0)
      const updateStar=starExists.slice(0, starsFirst).fill(1)
      const updateStarLast=starExists.slice(starsFirst , 6)
      if(Number(starLast) < 1 && Number(starLast) > 0){
         setStarExists(updateStar.concat(Number(starLast),updateStarLast))
      }else  if(Number(starLast) === 5){
        setStarExists([1,1,1,1,1])
      }else  if(Number(starLast) === 0){
        setStarExists(updateStar.concat(updateStarLast))

      }
    }
  }


return(
  <>
  {
starExists.map((rate:number,index:number)=> (

    <div className="star-rating">
      <div className="star-rating-wrapper" style={{ width: `${rate === 1 ? 100 : rate*100}%` }}>
        <svg
         enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x="0"
          y="0"
          className="icon-rating"
         
          onClick={()=>{onchangeStars(index)
         }}


        >
          <polygon
            points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
          ></polygon>
        </svg>
      </div>
      <svg
        enableBackground="new 0 0 15 15"
        viewBox="0 0 15 15"
        x="0"
        y="0"
        className="rating-stars__primary-star icon-rating-solid"
      
        onClick={()=>{onchangeStars(index)
          }}

      >
        <polygon
          points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        ></polygon>
      </svg>
    </div>
))
    }</>
)
}
export const ShowStars = ({ productStar,onchange }: { productStar: number,onchange?:(i:number)=>void }) => {
  
  return (
     <div className="header-rating-comment flex w-40">
    <Stars rating={productStar} onchange={onchange}/>
    </div>
  )
};
