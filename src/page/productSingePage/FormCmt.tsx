/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import ShowStars from "../../compoents/star-rating/ShowStar";
import useLocalStorage from "../../hook/useLocalStorage";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "../admin/Admin";



interface userComent {
    mess: string;
  }
const Comment = ({
    product,
    putComment,
    setListCmt,
    listCmt,
    setstarSelected,
    starSelected,
  }: {
    product: Product;
    putComment: (data: any) => void;
    setstarSelected: any;
    starSelected: any;
    setListCmt: any;
    listCmt: any[];
  }) => {
    const { register, handleSubmit, reset } = useForm<userComent>();
    const { getLocalItem } = useLocalStorage();
    const userName = getLocalItem("user");
  
    useEffect(() => {
      setListCmt(product?.comment);
    }, [product, setListCmt]);
  
    const onSubmit: SubmitHandler<userComent> = async (data: any) => {
      reset();
      const upComment = {
        user: userName.nickname,
        img: "avatar.png",
        comment: data,
        date: "11-09-2022",
        voteStar: starSelected,
      };
      setListCmt([...listCmt, upComment]);
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
  export default Comment