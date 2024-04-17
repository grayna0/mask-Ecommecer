/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./add.scss";
import { Product, productContext } from "../../Admin";
import { api } from "../../../../services/Api";

const AddProduct = ({ setClose }: { setClose: () => void }) => {
  const AminContext = useContext(productContext);

  const { register, handleSubmit } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    const file: any = data.img[0];
    const url: any = URL.createObjectURL(file);
    const updateRow = {
      img: url,
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
    <div className="add">
      <div className="modal">
        <h2>Add new Prodcut</h2>
        <button onClick={setClose}>click</button>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Name</label>
          <input type="text" {...register("title")} />
          <label htmlFor="price">Price</label>
          <input type="number" {...register("price")} />
          <label htmlFor="title">Producer</label>
          <input type="text" {...register("producer")} />
          <label htmlFor="quantity">Quantity</label>

          <input type="number" {...register("quantity")} />
          <input type="file" {...register("img")} />
          <input type="submit" />
          Submit
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
