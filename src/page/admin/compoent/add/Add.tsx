import  { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./add.scss";
import { memo } from "react";

import { Product, productContext } from "../../Admin";
import { api } from "../../../../services/Api";


const Add = ({ setClose }: { setClose: () => void }) => {
  const AminContext = useContext(productContext);

  const { register, handleSubmit } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    const updateRow = {
      img: data.img[0].name,
      discription: "",
      sale: "",
      inStock: true,
      price: data.price,
      // producer: AminContext.acountActive.nickname,
      title: data.title,
      quantity: data.quantity,
    };
    setClose();
    AminContext.setUpdateProduct(updateRow);

    await api.post(`/products`, updateRow);
  };


  return (
    <div className="add" >

    <div className="modal">
      <h2>Add new Prodcut</h2>
      <button onClick={setClose}>click</button>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} />
        <input type="number" {...register("price")} />
        <input type="text" {...register("producer")} />
        <input type="number" {...register("quantity")} />
        <input type="file" {...register("img")} />
        <input type="submit" />
        Submit
      </form>
    </div>
    </div>

  );
};

export default memo(Add);
