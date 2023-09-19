
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeCart } from '../store/slice/cartSlice'

const Checkout = () => {
  const listChose =useSelector((state:any)=>state.addToCart.itemsList)
   const dispatch =useDispatch()
  const removeItem = (item:any) =>{
    dispatch(removeCart(item))
  }
  const addToCartFn = (item: any) => {
    dispatch(addToCart(item));
  };


  return (
    <div>
      {listChose.map((item:any)=>(
        <div key={item.id}>
          <img src={`/${item.img}`} alt={item.img} />
          <p>{item.price}</p>
          <div>
            <button onClick={()=>addToCartFn(item)} >increment</button>
            <p>{item.quantity}</p>
            <button onClick={()=>removeItem(item)} >Decrement</button>
          </div>
        </div>
      ))}
      <button>Check Out</button>
    </div>
  )
}

export default Checkout