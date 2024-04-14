import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  countDownType,
  postTimeCountDown,
} from "../../../store/slice/countdownSlice";

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
    </div>
  );
};
export default AdminCountDown;

