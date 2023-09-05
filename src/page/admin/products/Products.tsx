import React, { useEffect } from "react";
import "../../../styles/products.scss";
import { BsSearch } from "react-icons/bs";
import Add from "../compoent/add/Add";
import DataTable from "./List-product";
import { useState, useContext } from "react";

import { productContext } from "../Admin";

export interface Product {
  id: number;
  img: FileList | File[];
  title: string;
  color: string;
  producer: string;
  price: string;
  createdAt: string;
  inStock: boolean;
  decription: string;
  quantity: number;
}
const Products = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const productData = useContext(productContext);
  const [sreachTitles, setSreachTitles] = useState<string>("");
  const [productSreach, setProductSreach] = useState<Product[]>([]);

  console.log(sreachTitles);
  console.log(productSreach);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return handleSreach();
  }, [sreachTitles]);

  const handleSreach = () => {
    const productsFined = productData.products.filter((item: any) =>
      item.title.includes(sreachTitles.trim())
    );

    if (productsFined.length > 0) {
      setProductSreach(productsFined);
    } else {
      setProductSreach([]);
    }
  };
  return (
    <div className="contain-product">
      <button className="add-product" onClick={openModal}>Add New</button>

      <div className="sreach-product">
        <label htmlFor="">
        <input
          type="text"
          placeholder="sreach...."
          onChange={(e) => setSreachTitles(e.target.value)}
        />
          <BsSearch className="icon-sreach" style={{ color: "black" }} />
        </label>
      </div>

      <div className="list-products">
        <DataTable
          dataProducts={
            sreachTitles.length > 0 ? productSreach : productData.products
          }
          setproducts={productData.setProducts}
        />
      </div>
      {isOpen && <Add setClose={closeModal} />}
    </div>
  );
};

export default Products;
