import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {Product} from "../Admin"
import { infoUser } from "../../../compoents/formLogin/type";
import { api } from "../../../services/Api";

export default function DataTable({
  dataProducts,
  setproducts,
 
}: {
  dataProducts: Product[];
  setproducts: any;
  producer:infoUser
}) {
  const prindIndex = (params: Product) => {
    return <p>{dataProducts.indexOf(params)}</p>;
  };
  console.log(dataProducts);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",

      renderCell: (params) => {
        return prindIndex(params.row);
      },
    },
    {
      field: "img",
      headerName: "Image",

      renderCell: (params) => {
        return <img src={`${params.row.img}` || "/logo512.png"} alt="" />;
      },
    },
    { field: "title", headerName: "Name", width: 130 },
    { field: "color", headerName: "Color", width: 130 },
    {
      field: "producer",
      headerName: "Producer",
      type: "string",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      type: "string",
    },
    {
      field: "inStock",
      headerName: "InStock",
      type: "bolean",
      renderCell: (params) => {
        return (
          <p>
            {params.row.quantity >0 ? (
              <BsCheck className="icon" style={{color:"green"}} />
            ) : (
              <IoMdClose  />
            )}
          </p>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        const id = params.row.id;
        const title = params.row.title;

        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/admin/product/${title}`}>
              <img src="./view.svg" alt="view" />
            </Link>
            <AiFillDelete className="icon" onClick={() => deleteProduct(id)} />
            {/* <p className="icon" onClick={() => dupliProduct(id)} >{id}</p> */}
          </div>
        );
      },
    },

  ];

  const deleteProduct = (id: number) => {
    const updateRows = dataProducts.filter((item) => item.id !== id);
    setproducts(updateRows);

      api.delete(`/products/${id}`)
      .then(() => {
        console.log("đã xóa thành coong");
      })
      .catch((errors) => {
        console.error("Error deleting product:", errors);
      });
  };



  // const dupliProduct = (id: number) => {
  //   const dip = dataProducts.find((item) => item.id === id);
 
    
  //   const updateRows = {
  //     img: dip?.img,
  //     description: dip?.description,
  //     sale: dip?.sale,
  //     inStock: true,
  //     price: dip?.price,
  //     producer:dip?.producer,
  //     title: dip?.title + "copy",
  //     quantity: dip?.quantity,
  //     star: dip?.star
  //   };
  //   axios
  //     .post(`${apiUrl}/products`,updateRows)
  //     .then(() => {
  //       console.log("dupli");
  //     })
  //     .catch((errors) => {
  //       console.error("Error deleting product:", errors);
  //     });
  // };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        style={{ backgroundColor: "white" }}
        rows={dataProducts}
        columns={[...columns]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        // slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //     quickFilterProps: { debounceMs: 500 },
        //   },
        // }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
