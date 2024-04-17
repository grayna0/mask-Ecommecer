import { useCallback, useContext, useEffect, useState } from "react";
import { Product } from "../Admin";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./productSingle.scss";
import { ChangeEvent } from 'react';
import { productContext } from "../Admin";
import { api } from "../../../services/Api";

export const ProductSingle = () => {
  const { id } = useParams<any>();
  const productData = useContext(productContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [img, setImg] = useState("");
  const { register, handleSubmit, setValue } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    const updateRow = {...product,
      img: img ? img :  product?.img ,
      inStock: data.inStock,
      price: Number(data.price),
      // producer: productData.acountActive.nickname,
      title: data.title,
      sale: Number(data.sale),
      quantity: Number(data.quantity),
      description: data.description,
      category: data.category,
    };

      try {
        productData.setUpdateProduct(updateRow);
        await api.put(`/products/${product?.id}`,updateRow);
      } catch (error) {
        console.log("error", error);
    }
  
  };
  const InfoProductSetToForm =useCallback(()=>{
    const Data =  productData.products.find(
      (item: Product) => item.title === id
    );
    if (Data) {
      setProduct(Data);
      setValue("title", Data.title);
      setValue("description", Data.description);
      setValue("img", Data.img);
      setValue("price", Data.price);
      setValue("sale", Data.sale);
      setValue("quantity", Data.quantity);
      setValue("inStock", Data.inStock);
    }

  },[id,productData.products, setValue,])
  useEffect(() => {
    InfoProductSetToForm()
  }, [id, productData.products, setValue, img,InfoProductSetToForm]);
    const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
      const file:any = e.target.files?.[0];
      const url = URL.createObjectURL(file);
              if (file) {
                setImg(url);
              }
    }
    console.log(product);
    
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="container-form">
        <div className="content-left">
          <div className="content-title">
            <h2> Title</h2>
            <input type="text" {...register("title")} placeholder="Title..." />
          </div>
          <div className="content-decription">
            <h2> Desription</h2>

            <textarea
              {...register("description")}
              placeholder="Description..."
            />
          </div>
        </div>
        <div className="content-right">
          <h2> Price</h2>

          <input type="number" {...register("price")} placeholder="Price..." />
          <input type="number" {...register("sale")} placeholder="Sale off" />
          <h2> Image</h2>

          <img
            src={img ? img : product?.img}
            alt=""
            width={250}
            height={200}
          />
          <input
            type="file"
            {...register("img")}
            onChange={(e) =>handleImg(e)}
          />
          <h2> Quantity</h2>
          <input
            type="number"
            {...register("quantity")}
            placeholder="Quantity..."
          />
          <h2> Category</h2>
          <select id="category" {...register("category")}>
            <option  value="cate1">cate1</option>
            <option  value="cate2">cate2</option>
            <option  value="cate3">cate3</option>
          </select>

      
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
