import React from "react";
import Chart from "react-google-charts";

let loko;
let loko1;
let loko3;

class ChartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData() {
    loko = this.props.labels;
    loko1 = this.props.data;
    // console.log(loko, loko1[0], loko1[1]);
    (loko3 = loko), [loko1].flat();
    return [loko, loko3];
  }

  // nice = this.props.labels;
  render() {
    console.log(this.getData());
    return (
      <Chart
        className="chart-view"
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.getData()}
        options={{
          hAxis: {
            title: "Time",
          },
          vAxis: {
            title: "Popularity",
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    );
  }
}

export default ChartView;
