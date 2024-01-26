import  { memo, useState } from "react";
import "./about.scss";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
const arrAboutUs = [
  {
    title: "lorem ipsum 1",
    desc: "Lorem ipsum dolor sit amet is just fine enough for this  website to work properly with others and for others to be able to continue.",
    name: "John Smith",
    local: "New York",
    avatar: "./avatar.png",
  },
  {
    title: "lorem ipsum  amet 2",
    desc: "Lorem ipsum dolor sit amet is just fine enough for this  website to work properly with others and for others to be able to continue.",
    name: "John Smith",
    local: "New York",
    avatar: "./avatar.png",
  },
  {
    title: "lorem ipsu 3",
    desc: "Lorem ipsum dolor sit amet is just fine enough for this  website to work properly with others and for others to be able to continue.",
    name: "John Smith",
    local: "New York",
    avatar: "./avatar.png",
  },
  {
    title: "lorem ipsum amet 4",
    desc: "Lorem ipsum dolor sit amet is just fine enough for this  website to work properly with others and for others to be able to continue.",
    name: "John Smith",
    local: "New York",
    avatar: "./avatar.png",
  },
];

const Aboutus = () => {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [indexShow, setIndexShow] = useState(0);
  const maxLength = arrAboutUs.length - 1;
  const productcer=document.querySelector(".productcer-list");
  const handleMouseDown = (event: any) => {
    setStartX(event.clientX);
    // @ts-ignore
    productcer.classList.remove("active")
  };
  const handleMouseMove = (event: any) => {
    setEndX(event.clientX);
  };
  const handleMouseUp = () => {
    if (startX === endX) {
      return;
    }
    if (startX - endX > 100) {
      indexShow >= maxLength
        ? setIndexShow(0)
        : setIndexShow((indexShow) => indexShow + 1);
     
    } else {
      indexShow <= 0
        ? setIndexShow(maxLength)
        : setIndexShow((indexShow) => indexShow - 1);
    }
    setStartX(0);
    setEndX(0); 
      // @ts-ignore
      productcer.classList.add("active")
 };
  return (
    <div
      className="productcer-wrap flex justify-center items-center"
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={ handleMouseUp}
    >
     <ListProductcers index={indexShow}/>
    </div>
  );
};

export default Aboutus;

const ListProductcers = memo(({ index }: { index: number }) => {
  return (
    <div className="productcer-list active" style={{ userSelect: "none" }}>
      <h2>{arrAboutUs[index].title}</h2>

      <p className="desc">
        <span>
          <BiSolidQuoteAltLeft className="quote" />
        </span>
        {arrAboutUs[index].desc}
        <span>
          <BiSolidQuoteAltLeft className="rotate quote" />
        </span>
      </p>

      <div className="productcer flex">
        <img
          className="avatar"
          src={arrAboutUs[index].avatar}
          alt={arrAboutUs[index].avatar}
        />
        <div>
          <h4>{arrAboutUs[index].local}</h4>
          <p>{arrAboutUs[index].name}</p>
        </div>
      </div>
    </div>
  );
});
