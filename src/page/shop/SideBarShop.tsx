




export const CateList = ({categoryList,getProductList,checked,}: {categoryList: any[];getProductList: (string: string) => void; checked: string;}) => {
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
  export const PriceList = ({getProductList,activePrice}: {getProductList: (string:number) => void,activePrice:number}) =>{
  
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
  export const SreachName = ({getProductList}: {getProductList: (string: string) => void}) =>{
    return (
      <>
      <input type="text" placeholder="Product Name....." onChange={(e)=>getProductList(e.target.value)}
     ></input>
      </>
    )
  }
  