import { FaCartPlus } from "react-icons/fa";
import Question from "../../compoents/question/Question";
import { Product } from "../admin/Admin";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {  useState } from "react";
import { api } from "../../services/Api";
import ListComment from "./ListComment";
import ShowStars from "../../compoents/star-rating/ShowStar";

const Descreption = ({ product }: { product: Product }) => {

  
  const dispatch = useDispatch();

  return (
    <>
      <div className="des-detail flex  flex-gap-20">
        <div className="flex-basic-50 lf-content ">
          <div className="Descreption bor-radius-20">
            <h2>Descreption</h2>
            <p className="decript">{product?.description?.slice(0, 200)}...</p>
          
          </div>
          <DeltailProduct />
          <Question />
        </div>
        <div className="flex-basic-50 rg-content">
          <div className="price">
            <h2 className="product-price">USD {product?.price}.00</h2>
            <ShowStars productStar={product?.star?.rating} />
    
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

          <ListComment product={product} />
          <Comment product={product}/>
        </div>
      </div>
    </>
  );
};

export default Descreption;
interface userComent {
  mess: string;
}
const Comment = ({ product }: { product: Product}) => {
  const { register, handleSubmit, reset } = useForm<userComent>();
  const [starSelected, setstarSelected] = useState<number>(0);

  const putComment = async (data: any) => {
    const ratingUpdate = product.comment?.map((item) => item.voteStar);
    const totalRatingUpdate = ratingUpdate?.reduce(
      (sum, currentRating) => sum + currentRating,
      0
    );
    const upstar = {
      totalStars: totalRatingUpdate,
      rating: totalRatingUpdate / product.comment?.length,
      totalUserVote: product.comment?.length,
    };
    const upComment = {
      user: "grayna0@gmail.com",
      img: "avatar.png",
      comment: data,
      date: "11-09-2022",
      voteStar: starSelected,
    };
    await api.put(`/products/${product.id}`, {
      ...product,
      star: upstar,
      comment: [...product?.comment, upComment],
    });
  };
  const onSubmit: SubmitHandler<userComent> = async (data: any) => {
  
    reset();
    
    putComment(data.mess);
  };

  const onchage = (index: number) => {
    setstarSelected(index);
  };
  return (
    <div className="form-comment">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register("mess")} placeholder="Your message...." />
        <div className="flex justify-between gap-10 my-7 ">
          <div className="vote-star">
            <h3 className="my-1">Vote Star :</h3>
            <ShowStars onchange={onchage} productStar={starSelected} />
          </div>
          <input className="button-sent-comment" type="submit" />
        </div>
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
