/* eslint-disable @typescript-eslint/no-explicit-any */
import "./tableproduct.scss";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../store/slice/cartSlice";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "../../page/admin/Admin";
import { CSSProperties, useEffect, useState } from "react";
import { BsEmojiHeartEyesFill, BsEyeSlashFill } from "react-icons/bs";
import useLocalStorage from "../../hook/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TableProduct = ({
  productData,
  showaddToCart,
  style,
  showErrorSreach,
  nofound,
}: {
  productData: Product[];
  showaddToCart: boolean;
  style?: CSSProperties;
  showErrorSreach?: boolean;
  nofound?: boolean;
}) => {
  const [optionSort, setOptionSort] = useState<string>("sort-price");

  const setSort = (value: string) => {
    setOptionSort(value);
    if (value === "sort-increment") {
      productData.sort(
        (itemFirst, itemSecond) => itemFirst.price - itemSecond.price
      );
    } else if (value === "sort-decrement") {
      productData.sort(
        (itemFirst, itemSecond) => itemSecond.price - itemFirst.price
      );
    } else if (value === "sort-name") {
      productData.sort((itemFirst, itemSecond) =>
        itemFirst.title.localeCompare(itemSecond.title)
      );
    }
  };

  return (
    <>
      <div className="cate-product flex " style={style}>
        {showErrorSreach && (
          <div className="filter ">
            <select
              value={optionSort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="sort-name">ASC Sort</option>
              <option value="sort-increment">Low to Hight</option>
              <option value="sort-decrement">Hight to Low</option>
            </select>
          </div>
        )}
        {productData.length === 0 || !nofound ? (
          <p>NO FOUND PRODUCTS</p>
        ) : (
          <ProductList productlist={productData} showaddcart={showaddToCart} />
        )}
      </div>
    </>
  );
};
export const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const ProductList = ({
  productlist,
  showaddcart,
}: {
  productlist: Product[];
  showaddcart: boolean;
}) => {
  const { setLocalItem, getLocalItem } = useLocalStorage();

  const listChose = useSelector((state: any) => state.addToCart.itemsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLocalItem("cart", [...listChose]);

    return; 
  }, [listChose]);

  const toProductPage = (id: string) => {
    navigate(`/product/${id}`);
  };

  const addToCartFn = (item: any) => {
    const checkUserLogin = getLocalItem("user");

    if (checkUserLogin) {
      dispatch(addToCart(item));
      toast.success("Add to cart succeed", toastOptions);

    } else {
      toast.error("Login to continue", toastOptions);

    }
  };

  return (
    <>
      {productlist.map((item) => {
        return (
          <div className="box-product" key={item.id}>
            <div className="box-img " onClick={() => toProductPage(item.title)}>
              <img className="img" src={`${item.img}`} alt={`${item.img}`} />
              {showaddcart && (
                <div>
                  <h3 className="title">
                    {item.title.length > 20
                      ? `${item.title.slice(0, 20)}...`
                      : item.title}
                  </h3>
                  <h3 className="price">${item.price}</h3>
                </div>
              )}

              <div className="btn-icon">
                <BsEmojiHeartEyesFill className="icon-add-cart" />
                <BsEyeSlashFill
                  className="icon-add-cart"
                  onClick={() => toProductPage(item.title)}
                />
                <FaCartPlus
                  className="icon-add-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCartFn(item);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
       <ToastContainer />
    </>
  );
};

export default TableProduct;
export function PaginationRounded({
  products,
  pagination,
  nofound,
}: {
  products: Product[];
  pagination: (e: any) => void;
  nofound: boolean;
}) {
  return (
    <>
      {nofound && (
        <div className="flex justify-center my-5">
          <Stack spacing={2} className="mx-auto ">
            <Pagination
              count={Math.round(products.length / 9)}
              variant="outlined"
              shape="rounded"
              onChange={(e: any) => pagination(Number(e.target.innerText))}
            />
          </Stack>
        </div>
      )}
    </>
  );
}
