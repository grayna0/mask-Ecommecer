import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import { BsCameraFill } from "react-icons/bs";
import "./userpage.scss";
import { changeUserDetails } from "../../store/slice/authSlice";
import useLocalStorage from "../../hook/useLocalStorage";
import { useDispatch } from "react-redux";
import { useState } from "react";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        backgroundColor: "white",
        maxWidth: "70%",
        margin: " 100px auto",
        borderRadius: 5,
        padding: 1,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Profile Info" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserDetailsPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

const UserDetailsPanel = () => {
  const { getLocalItem, setLocalItem } = useLocalStorage();
  const [fileUpload, setFile] = useState<any>();
  const useDetail = getLocalItem("user");
  const useCart = getLocalItem("cart");
  const dispatch = useDispatch();

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file:any = e.target.files?.[0]

    setFile(URL.createObjectURL(file))


    // @ts-ignore
    dispatch(changeUserDetails({ ...useDetail, img: URL.createObjectURL(file) }));
    setLocalItem("user", { ...useDetail, img: URL.createObjectURL(file) });
  };
  return (
    <div className="w-full">
      <div className="header-user flex justify-between">
        <h2> My Profile</h2>
        <button> Edit Profile</button>
      </div>
      <div className="box-info-user flex gap-5">
        <div className="box-img-user  bg-zinc-200 p-4">
          <Avatar alt="Remy Sharp" src={useDetail.img} />
          <label htmlFor="img">
            <BsCameraFill />
            <input
              type="file"
              id="img"
              style={{ display: "none" }}
              onChange={(e) => handleImg(e)}
            />
          </label>
          <span> Nick DuBuque</span>
        </div>
        <div className="box-order-user  bg-zinc-200 p-4">
          <h2>15</h2>
          <span> All Orders</span>
        </div>
        <div className="box-order-user  bg-zinc-200 p-4">
          <h2>{useCart.length}</h2>
          <span>Awaiting Payments</span>
        </div>
      </div>
      <table style={{ width: "80%" }} className=" bg-zinc-200 p-4 rounded-md">
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Birth date</td>
        </tr>
        <tr>
          <td>Nick</td>
          <td>DuBuque</td>
          <td>Jayden.Gislason78@gmail.com</td>
          <td>(445) 653-3771 x985</td>
          <td>26 Apr, 1996</td>
        </tr>
      </table>
    </div>
  );
};
