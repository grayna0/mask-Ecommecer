import { Product } from "../admin/Admin";

const ListComment = ({ product }: { product: Product }) => {
  return (
    <div className="list-comment">
      {product?.comment?.map((i: any, index: any) => (
        <div className="user-comment" key={index}>
          <div className="user-img">
            <img src={`/${i.img}`} alt={i.img} />
            <p>{i.date}</p>
          </div>
          <div className="user-dsc-comment">
            <p>{i.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComment;
