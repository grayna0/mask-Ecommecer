import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";
import "./shopcart.scss"

const ShopCart = () => {

  const list =useSelector((state:any) => state.addToCart.itemsList)


  const dispatch = useDispatch();
  const removeItem = (item: any) => {
    dispatch(removeCart(item));
  
  };
  const addToCartFn = (item: any) => {
    dispatch(addToCart(item));
    

  };


  return (
    <div className="container-pg">
      <h2 className="title-lg text-center py-14 my-6 bg-slate-200 text-black">
        <Link to="/" className="text-red-600">HOME</Link>/CART
      </h2>
      <div className="list-cart">
        <h2>Lorem ipsum dolor</h2>
        <table>
          <tbody>
          <tr>
            <th>IMAGE</th>
            <th>PRODUCT NAME</th>
            <th>UNIT PRICE</th>
            <th>QTY</th>
            <th>SUBTOTAL</th>
            <th>ACTION</th>
          </tr>
        {list.map((item: any) => (
          <tr key={item.id}>
            <td className="td-img">
              <img className="thumb" src={`/${item.img}`} alt={item.img} />
            </td>
            <td>
              <p>{item.name}</p>
            </td>
            <td>
              <p>{item.price}</p>
            </td>
            <td>
              <button onClick={() => addToCartFn(item)}>increment</button>
              <p>{item.quantity}</p>
              <button onClick={() => removeItem(item)}>Decrement</button>
            </td>
            <td>
              <p>{item.totalPrice}</p>
            </td>
            <td>
              <button onClick={() => removeItem(item.id)}>delete</button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
      <Link to="/checkout"><h2 className="bg-red-400 inline-block my-8 rounded-3xl p-3">Check Out</h2></Link>
    </div>
  );
};

export default ShopCart;
