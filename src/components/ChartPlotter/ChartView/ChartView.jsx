import React from "react";
import Chart from "react-google-charts";
import "./ChartView.css";

class ChartView extends React.Component {
  constructor(props) {
    super(props);
    this.plotFinalData = this.plotFinalData.bind(this);
  }

  plotFinalData() {
    let labels = this.props.labels;
    let data = this.props.data;
    let error;

    try {
      if (labels.length === data[0].length) {
        if (data.indexOf(labels) === -1) {
          error = document.querySelector(".error-message-data");
          error.classList.remove("display");
          data.unshift(labels);
        }
        return data;
      } else {
        data = [
          ["x", "error"],
          [0, 0],
          [0, 0],
        ];
        error = document.querySelector(".error-message-data");
        error.classList.add("display");
        return data;
      }
    } catch (error) {}
  }

  render() {
    console.log(this.plotFinalData());
    return (
      <Chart
        className="chart-view"
        width={"95%"}
        height={"550px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.plotFinalData()}
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
