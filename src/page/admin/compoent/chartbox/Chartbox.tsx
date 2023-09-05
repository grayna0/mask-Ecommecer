import "./chartbox.scss";
import { Link } from "react-router-dom";
import { ChartContainer } from "@mui/x-charts";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";

// import Users from './../../users/users';
type Prop = {
  color: string;
  icon: string;
  title: string;
  number: string | number;
  dataKey: string;
  percentage: number;
  chartData: {}[];
};
const Chartbox = (prop: Prop) => {
  const { color, icon, title, number, dataKey, percentage, chartData } = prop;
  const dataLineX = chartData.map((i: any) => {
    return i.name;
  });
  const dataLine = chartData.map((i: any) => {
    return i[dataKey];
  });

  return (
    <div className="chartbox">
      <div className="chartbox-left">
        <div className="chartbox-title">
          <img src={icon} alt="" />
          <span>{title}</span>
        </div>
        <div className="chartbox-num">
          <h2>{number}</h2>
        </div>
        <Link to="/" style={{ color: color }}>
          View all
        </Link>
      </div>
      <div className="chartbox-right">
        <ChartContainer
         
          series={[{ type: "line", data: dataLine }]}
          xAxis={[{ scaleType: "point", data: dataLineX }]}
          sx={{
            ".MuiLineElement-root": {
              stroke: "#8884d8",
              strokeWidth: 2,
            },
            ".MuiMarkElement-root": {
              stroke: "#8884d8",
              scale: "0.6",
              fill: "#fff",
              strokeWidth: 2,
            },
          }}
          disableAxisListener
       width={300}
       height={200}
        >
          <LinePlot />
          <MarkPlot />
        </ChartContainer>
        <div className="percentage" style={{ color: color }}>
          <h3>{percentage}%</h3>
          <p>This month</p>
        </div>
      </div>
    </div>
  );
};

export default Chartbox;
