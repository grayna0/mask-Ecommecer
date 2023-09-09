import React, { useContext, useEffect, useState } from "react";
import { Products } from "../Admin";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./productSingle.scss";
import { ChangeEvent } from 'react';
import { productContext } from "../Admin";
import axios from "axios";
import apiUrl from "../../../services/Api";

export const ProductSingle = () => {
  const { id } = useParams<any>();
  const productData = useContext(productContext);
  const [product, setProduct] = useState<Products | null>(null);
  const [img, setImg] = useState("");

  const { register, handleSubmit, setValue } = useForm<Products>();
  const onSubmit: SubmitHandler<Products> = async (data) => {
 

    const updateRow = {
      img: img,
      inStock: data.inStock,
      price: data.price,
      producer: productData.acountActive.nickname,
      title: data.title,
      sale: data.sale,
      quantity: data.quantity,
      description: data.description,
    };

    if (img) {
      try {
        productData.setUpdateProduct(updateRow);
        await axios.put(`${apiUrl}/products/${product?.id}`, updateRow);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const newProduct = { ...updateRow, img: product?.img };
        productData.setUpdateProduct(newProduct);
        await axios.put(`${apiUrl}/products/${product?.id}`, newProduct);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  useEffect(() => {
    const Data = productData.products.find(
      (item: Products) => item.title === id
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
  }, [id, productData.products, setValue, img]);
    const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
              if (file) {
                setImg(file?.name);
              }
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            src={img ? `/${img}` : `/${product?.img}`}
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
          <h2> InStock</h2>

          <input type="text" {...register("inStock")} />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
