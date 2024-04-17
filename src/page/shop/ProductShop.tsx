import { useCallback, useContext, useEffect, useState } from "react";
import "./productshop.scss";
import TableProduct, {
  PaginationRounded,
} from "../../compoents/tableproduct/TableProduct";
import { ProductContext } from "../../layout/Index";
import { Product } from "../admin/Admin";
import { CateList, PriceList, SreachName } from "./SideBarShop";

const ShopProducts = () => {
  const productContext = useContext(ProductContext);
  const [productCateList, setProductCateList] = useState<Product[]>([]);
  const [productSreach, setProductSreach] = useState<Product[]>([]);
  const [nofound, setNofound] = useState<boolean>(true);
  const [activePrice, setActivePrice] = useState<number>(0);
  const [checked, setChecked] = useState("");
  const [indexPage, setIndexPage] = useState<number>(0);
  let propTableProducts: Product[] = [];
  if (productSreach) {
    propTableProducts =
      productSreach.length <= 0 ? productCateList : productSreach;
  }
  useEffect(() => {
    pagination(indexPage ? indexPage : 1);
  }, [productContext.products, indexPage]);

  //remove duplicate products
  const categoryList = [
    ...new Set(productContext.products.map((item: any) => item.category)),
  ];

  // sreach by name and price

  const sreachByNameAndPrice = (prop: string | number) => {
    let resultSreach: Product[] | null = [];
    if (typeof prop === "number") {
      resultSreach = productCateList.filter(
        (item: Product) => item.price < prop
      );
      setActivePrice(prop);
      // NO FOUND PRODUCTS
      resultSreach.length === 0 ? setNofound(false) : setNofound(true);
    } else if (typeof prop === "string") {
      resultSreach = productCateList.filter((item: Product) =>
        item.title.includes(prop)
      );
    }
    setProductSreach(resultSreach);
  };

  // sreach by category
  const getProductList = (i: string) => {
    const itemList = productContext.products.filter(
      (item: Product) => item.category === i
    );
    setNofound(true);
    setProductSreach([]);
    setActivePrice(0);
    setChecked(i);
    if (i === "all") {
      setProductCateList(productContext.products);
    } else {
      setProductCateList(itemList);
    }
  };
  const pagination = useCallback((e: any) => {
    setIndexPage(e);
    const listItem: Product[] = productContext.products.slice(
      (indexPage - 1) * 9,
      indexPage + 9
    );
    setProductCateList(listItem);
  },[indexPage,productContext.products]);
  return (
    <div className="shop container-pg ">
      <div className="banner-shop "></div>
      <div className="wrap-product">
        <div className="sidebar">
          <div className="cate-list">
            <SreachName getProductList={sreachByNameAndPrice} />
            <CateList
              categoryList={categoryList}
              getProductList={getProductList}
              checked={checked}
            />
            <PriceList
              getProductList={sreachByNameAndPrice}
              activePrice={activePrice}
            />
          </div>
        </div>
        <div className="cate-product">
          <TableProduct
            productData={propTableProducts}
            showaddToCart={true}
            nofound={nofound}
            showErrorSreach={true}
          />

          <PaginationRounded
            pagination={pagination}
            products={productCateList}
            nofound={nofound}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
