/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCartPlus } from "react-icons/fa";
import Question from "../../compoents/question/Question";
import { Product } from "../admin/Admin";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/Api";
import ListComment from "./ListComment";
import ShowStars from "../../compoents/star-rating/ShowStar";
import useLocalStorage from "../../hook/useLocalStorage";
import Comment from "./FormCmt";
import { toast } from "react-toastify";
import { toastOptions } from "../../compoents/tableproduct/TableProduct";

const Descreption = ({ product }: { product: Product }) => {
  const [listCmt, setListCmt] = useState<any[]>([]);
  const [starSelected, setstarSelected] = useState<number>(0);
  const { getLocalItem } = useLocalStorage();
  const userName = getLocalItem("user");
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
      user: userName.nickname,
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
  const dispatch = useDispatch();

  return (
    <>
      <div className="des-detail flex  flex-gap-20">
        <div className="flex-basic-50 lf-content ">
          <div className="Descreption bor-radius-20">
            <h2>Descreption</h2>
            <p className="decript">{product?.description?.slice(0, 200)}...</p>
          </div>
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
              onClick={() => {dispatch(addToCart(product))
                toast.success("Add to cart succeed", toastOptions);}
              }
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

          <ListComment listCmt={listCmt} />
          <Comment
            product={product}
            setListCmt={setListCmt}
            listCmt={listCmt}
            putComment={putComment}
            setstarSelected={setstarSelected}
            starSelected={starSelected}
          />
        </div>
      </div>
    </>
  );
};

export default Descreption;

