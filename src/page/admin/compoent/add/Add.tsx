/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./add.scss";
import { Product, productContext } from "../../Admin";
import { api } from "../../../../services/Api";

const AddProduct = ({ setClose }: { setClose: () => void }) => {
  const {setUpdateProduct} = useContext(productContext);
  const { register, handleSubmit } = useForm<Product>();
  
  const onSubmit: SubmitHandler<Product> = async (data) => {
    
    const file :any= data.img[0];
    const reader = new FileReader();
    
    reader.onloadend = async  function() {
      const base64String = reader.result as string;
      
      const updateRow = {
        img: base64String,
        discription: "",
        sale: "",
        inStock: true,
        price: data.price,
        // producer: AminContext.acountActive.nickname,
        title: data.title,
        quantity: data.quantity,
      };
      setClose();
      setUpdateProduct(true);
      await api.post(`/products`, updateRow);
    };
    reader.readAsDataURL(file);
    
  };

  return (
    <div className="add">
      <div className="modal">
        <h2>Add new Prodcut</h2>
        <button onClick={setClose}>click</button>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-file">
            <h2  className="label-file">Name</h2>
            <input type="text" {...register("title")} />
          </div>
          <div className="input-file">
            <h2 className="label-file" >Price</h2>
            <input type="number" {...register("price")} />
          </div>
        
          <div className="input-file">
            <h2 className="label-file">Quantity</h2>

            <input type="number" {...register("quantity")} />
          </div>
          <input type="file" {...register("img")} />
          <div>

          <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
