import "./tableproduct.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { addToCart } from "../../store/slice/cartSlice";

import { Product } from "../../page/admin/Admin";
import { CSSProperties } from "react";
const TableProduct = ({
  productData,
  showaddToCart,
  style,
}: {
  productData: Product[];
  showaddToCart: boolean;
  style?: CSSProperties;
}) => {
  const navigate = useNavigate();
  const toProductPage = (id: string) => {
    navigate(`/product/${id}`);
  };
  const dispatch = useDispatch();

  const addToCartFn = (item: any) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <h2 className="title-head"> CATE</h2>

      <div className="cate-product flex" style={style}>
        {productData.map((item) => {
          return (
            <div className="box-product" key={item.id}>
              <div
                className="box-img "
                onClick={() => toProductPage(item.title)}
              >
                <img className="img" src={`/${item.img}`} alt={`${item.img}`} />
                <h3 className="title">{item.title}</h3>
                <h3 className="price">{item.price}</h3>
              </div>
              {showaddToCart && (
                <button
                  className="add-to-cart"
                  onClick={() => addToCartFn(item)}
                >
                  Add to cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TableProduct;
