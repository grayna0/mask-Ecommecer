import React, {useContext} from "react";
import TableProduct from "../tableproduct/TableProduct";
import { ProductContext } from "../../layout/Index";




const MyComponent: React.FC = () => {
  const productContext=useContext(ProductContext)

  return (
    <div>
    <TableProduct productData={productContext.products} showaddToCart={true}/>
    </div>
  );
};

export default MyComponent;
