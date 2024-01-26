import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  countDownType,
  postTimeCountDown,
} from "../../../store/slice/countdownSlice";
import { CSSProperties, useEffect, useState } from "react";

const AdminCountDown = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<any>();
  const onSubmit: SubmitHandler<countDownType> = (data: any) => {
    const arrDate = data.date.split("-");
    const dateCountDown = {
      days: arrDate[2],
      month: arrDate[1],
      year: arrDate[0],
    };
    // @ts-ignore
    dispatch(postTimeCountDown(dateCountDown));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("content")} />
        <input id="datess" type="date" {...register("date")} />
        <input type="submit" />
      </form>
      <TestMouseMove />
    </div>
  );
};
export default AdminCountDown;

const TestMouseMove = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e: any) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    const box = document.getElementById("box");
    box?.addEventListener('pointermove', handleMove);
    return () => box?.removeEventListener('pointermove', handleMove);
  }, []);

  const stylist: CSSProperties = {
    position: "absolute",
    backgroundColor: "pink",
    borderRadius: "50%",
    transform: `translate(${position.x}px, ${position.y}px)`,
    pointerEvents: "none",
    left: -20,
    top: -20,
    width: 40,
    height: 40,
  };

  return (
    <div className="w-80 h-96 bg-neutral-950" id="box" >
      <div style={stylist}></div>
    </div>
  );
};