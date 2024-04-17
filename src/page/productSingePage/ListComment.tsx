/* eslint-disable @typescript-eslint/no-explicit-any */

const ListComment = ({listCmt }: {listCmt:any[] }) => {
  console.log(listCmt);
  
  return (
    <div className="list-comment">
      {listCmt?.map((i: any, index: any) => (
      
        <div className="user-comment" key={index}>
          <div className="user-img">
       
            {/* <img src={`/${i.img}`} alt={i.img} /> */}
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
