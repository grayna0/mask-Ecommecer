import React, { useContext, useEffect, useState } from "react";
import "./productshop.scss";
import TableProduct from "../../compoents/tableproduct/TableProduct";
import { ProductContext } from "../../compoents/layout/Index";
import { Product } from "../admin/Admin";


const ShopProducts = () => {
  const productContext = useContext(ProductContext);
  const [productCateList, setProductCateList] = useState<Product[]>([]);
  const [productSreach, setProductSreach] = useState<Product[]>([]);
  const [showErrorSreach, setShowErrorSreach] = useState<boolean>(true);
  const [activePrice, setActivePrice] = useState<number>(0);
  const [checked, setChecked] = useState("");

  let propTableProducts:Product[] =[]
  if(productSreach) {
   propTableProducts=productSreach.length <=0 ? productCateList  : productSreach
}
  
  useEffect(() => {
    setProductCateList(productContext.products);
  }, [productContext.products]);

  //remove duplicate products
  const categoryList = [
    ...new Set(productContext.products.map((item: any) => item.category)),
  ];
  
// sreach by name and price

const sreachByNameAndPrice = (prop:string | number) =>{
  let resultSreach:Product[] | null= []
  if(typeof prop === 'number'){
     resultSreach =productCateList.filter(
      (item: Product) => item.price < prop) 
      setActivePrice(prop)
      // NO FOUND PRODUCTS
    resultSreach.length === 0 ? setShowErrorSreach(false) : setShowErrorSreach(true)
    
  }else if (typeof prop === 'string'){
     resultSreach =productCateList.filter(
      (item: Product) => item.title.includes(prop)
    )
   

  }
  setProductSreach(resultSreach); 
}


// sreach by category 
  const getProductList = (i: string) => {
    const itemList = productContext.products.filter(
      (item: Product) => item.category === i
    );
    setShowErrorSreach(true);
    setProductSreach([])
    setActivePrice(0)
    setChecked(i);
    if (i === "all") {
      setProductCateList(productContext.products);
    }
     else {
      setProductCateList(itemList);
    }
  };
  
  return (
    <div className="shop container-pg ">
      <div className="banner-shop ">banner</div>
      <div className="wrap-product">
        <div className="sidebar">
          <div className="cate-list">
            <SreachName  getProductList={sreachByNameAndPrice}/>
            <CateList
              categoryList={categoryList}
              getProductList={getProductList}
              checked={checked}
            />
            <PriceList  getProductList={sreachByNameAndPrice} activePrice={activePrice}/>
          </div>
        </div>
        <TableProduct productData={propTableProducts} showaddToCart={true} showErrorSreach={showErrorSreach} />
      </div>
    </div>
  );
};

export default ShopProducts;


const CateList = ({categoryList,getProductList,checked,}: {categoryList: any[];getProductList: (string: string) => void; checked: string;}) => {
  return (
    <>
        <h2 className="header-cate ">Category</h2>
      {categoryList.map((i: any) => {
        if (i !== undefined) {
          return (
            <>
              <label className="search-cate">
                <input
                  type="checkbox"
                  onClick={() => getProductList(i)}
                  checked={checked === i}
                  value={i}
                ></input>
                {i}
              </label>
            </>
          );
        }
      })}
      <label>
        <input
          type="checkbox"
          checked={checked === "all"}
          onClick={() => getProductList("all")}
        />
        All
      </label>
    </>
  );
};
const PriceList = ({getProductList,activePrice}: {getProductList: (string:number) => void,activePrice:number}) =>{

  return (
    <>
    <h2 className="header-price">Price</h2>
        <p className={`search-price ${activePrice === 100 ? 'active' : ''}`} onClick={()=>getProductList(100)}>0 - 100$ </p>
        <p className={`search-price ${activePrice === 200 ? 'active' : ''}`} onClick={()=>getProductList(200)}>100 - 200$ </p>
        <p className={`search-price ${activePrice === 900 ? 'active' : ''}`} onClick={()=>getProductList(900)}>200 - 900$ </p>
        <p className={`search-price ${activePrice === 1000 ? 'active' : ''}`} onClick={()=>getProductList(1000)}>900 - 1000$ </p>
    </>
  )
}
const SreachName = ({getProductList}: {getProductList: (string: string) => void}) =>{
  return (
    <>
    <input type="text" placeholder="Product Name....." onChange={(e)=>getProductList(e.target.value)}
   ></input>
    </>
  )
}
