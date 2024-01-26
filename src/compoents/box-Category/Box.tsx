
import Box from "@mui/material/Box";
import "./boxcate.scss";
const Boxs = () => {
  return (
    <>
      <Box
        className="box-cate-list"
        sx={{
          height: 300,
          backgroundImage: `url('banner-menswear.jpg')`,
          backgroundSize: "1000px",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",

          "&:hover": {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>
          <h2 className="title-box">Menswear</h2>
          <p className="des-box">Pants, Shirts, Jackets</p>
        </div>
      </Box>
      <Box
        className="box-cate-list"
        sx={{
          height: 300,
          backgroundImage: `url('banner-footwear.jpg')`,
          backgroundSize: "1000px",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>
          <h2 className="title-box">Footwear</h2>
          <p className="des-box">Sneakers, Boots, Socks</p>
        </div>
      </Box>
      <Box
        className="box-cate-list"
        sx={{
          backgroundImage: `url('banner-pants.jpg')`,
          backgroundSize: "1000px",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "left",
          height: 300,

          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>
          <h2 className="title-box">Pants</h2>
          <p className="des-box">Pants, Short, Jackets</p>
        </div>
      </Box>
      <Box
        className="box-cate-list"
        sx={{
          height: 300,
          backgroundImage: `url('banner-large.jpg')`,
          backgroundSize: "2000px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
        
        }}
      >
        <div>
          <h2 className="title-box">Headwear</h2>
          <p className="des-box">Helmets, Masks, Caps</p>
        </div>
      </Box>
    </>
  );
};

export default Boxs;
