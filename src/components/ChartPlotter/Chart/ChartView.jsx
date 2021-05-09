import React from "react";
import Chart from "react-google-charts";
import "./ChartView.css";

let labels;
let data;
let finalData = [];

class ChartView extends React.Component {
  render() {
    console.log(this.props.finalData);
    return (
      <Chart
        className="chart-view"
        width={"95%"}
        height={"550px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.props.finalData}
        options={{
          hAxis: {
            title: "Time in minutes",
          },
          fontSize: 14,
          fontName: "Source Sans Pro",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    );
  }
}

export default ChartView;
