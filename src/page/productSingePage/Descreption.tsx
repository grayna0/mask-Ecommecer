
import Question from "../../compoents/question/Question";
import { Product } from "../admin/Admin";


const DeltailProduct =() =>{
  return (
    <>
    <div className="heighlight bor-radius-20">
      <h2>HighLights</h2>
      <div className="flex">

      <ul className="flex-basic-50">
        <li><p>Controllable LED lights</p></li>
        <li><p>Carefully Handcrafted</p></li>
        <li><p>Adjustable Straps</p></li>
      </ul>
      <ul  className="flex-basic-50">
        <li><p>Velcro Cushion Pads</p></li>
        <li><p>Carefully Handcrafted</p></li>
        <li><p>Adjustable Straps</p></li>
      </ul>
      </div>
    </div>

    </>
  )
}
 


const Descreption = ({ product }: { product: Product }) => {

  return (
    <>
    <div className="flex  flex-gap-20">
      <div className="flex-basic-50  ">
        <div className="Descreption bor-radius-20">

        <h2>Descreption</h2>
        <p className="decript">{product?.description.slice(0, 200)}...</p>
        <button className="button">Read More</button>
        </div>
        <DeltailProduct/>
        <Question/>
      </div>
      <div className="flex-basic-50">
        <div className="price">
          <h2 className="product-price">USD {product?.price}.00</h2>
        </div>
        <div className="actions flex">
          <button>Add To Cart</button>
          <button>Show Bag</button>
        </div>
      </div>
     
    </div>
   
    </>
  );
};

export default Descreption;
