import "./tableproduct.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { addToCart } from "../../store/slice/cartSlice";

import { Product } from "../../page/admin/Admin";
import { CSSProperties,useState } from "react";

const TableProduct = ({
  productData,
  showaddToCart,
  style,
  showErrorSreach
}: {
  productData: Product[];
  showaddToCart: boolean;
  style?: CSSProperties;
  showErrorSreach?:boolean
}) => {

  const [optionSort, setOptionSort]=useState<string>("sort-price")

  const setSort = (value:string ) =>{
    setOptionSort(value)
    if(value ==="sort-increment"){
      productData.sort((itemFirst, itemSecond) => itemFirst.price - itemSecond.price )
    }else if (value ==="sort-decrement"){
      productData.sort((itemFirst, itemSecond) => itemSecond.price - itemFirst.price )

    }
    else if (value ==="sort-name"){
      productData.sort((itemFirst, itemSecond) => itemFirst.title.localeCompare(itemSecond.title));

    }
    console.log(productData);
  }
  
  return (
    <>
      <div className="cate-product flex " style={style}>
      { showaddToCart &&   <div className="filter ">
          <select value={optionSort}
          onChange={e=>setSort(e.target.value)}>
            <option value="sort-name" >ASC Sort</option>
            <option value="sort-increment">Low to Hight</option>
            <option value="sort-decrement" >Hight to Low</option>
          </select>
        </div>}
        {showErrorSreach ?   <ProductList productlist={productData} showaddcart={showaddToCart} /> : 
        <p>NO FOUND PRODUCTS</p>}
     
      </div>
    </>
  );
};


const ProductList = ({ productlist, showaddcart,}: { productlist: Product[]; showaddcart: boolean;}) => {
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
      {productlist.map((item) => {
        
        return (
          <div className="box-product" key={item.id}>
            <div className="box-img " onClick={() => toProductPage(item.title)}>
              <img className="img" src={`/${item.img}`} alt={`${item.img}`} />
              <h3 className="title">
                {item.title.length > 20
                  ? `${item.title.slice(0, 20)}...`
                  : item.title}
              </h3>
              <h3 className="price">{item.price}</h3>
            </div>
            {showaddcart && (
              <button className="add-to-cart" onClick={() => addToCartFn(item)}>
                Add to cart
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

  export default TableProduct;