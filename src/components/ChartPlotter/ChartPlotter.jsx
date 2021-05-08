import React from "react";
import CodeInput from "./CodeInput/CodeInput";
import Footer from "./Footer/Footer";
import ChartView from "./Chart/ChartView";
import EventData from "./modules/EventData";
import EventStart from "./modules/EventStart";
import EventSpan from "./modules/EventSpan";
import EventStop from "./modules/EventStop";

class ChartPlotter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      start: [],
      stop: [],
      span: [],
      treatedData: [],
      treatedLabels: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();

    let temp1;
    let treatedValues;
    let start;
    let span;
    let stop;
    let data;
    let selectItems = [];
    let groupItems = [];
    let labels = [];
    let finalLabels = [];
    let values = [];

    try {
      let convertedInput = this.state.input
        .toLowerCase()
        .replaceAll("'", "")
        .replaceAll('"', "")
        .replaceAll(/([a-z_]+)/g, '"$&"')
        .match(/\{[^}]+\}/g)
        .map(JSON.parse);

      convertedInput.forEach((line, index) => {
        if (line.type == "start" && !start) {
          start = new EventStart();
          start.group = line.group;
          start.select = line.select;
        } else if (line.type == "span" && start && !span) {
          span = new EventSpan();
          span.begin = line.begin;
          span.end = line.end;
        } else if (line.type == "stop" && span) {
          stop = new EventStop();
          stop.timestamp = line.timestamp;
        } else if (line.type == "data" && span) {
          data = new EventData();

          // data.os === data["os"] === data[start.group[0]]
          // data[start.select[0]];

          // Pegando os grupos

          start.group.forEach((groupItem, groupIdx) => {
            if (line[groupItem]) {
              if (groupItems.indexOf(groupItem) === -1) {
                groupItems.push(groupItem);
              }
              data.groupStartMatch = groupItems;
            }
          });

          // Pegando os select

          start.select.forEach((selectItem, selectIdx) => {
            if (line[selectItem]) {
              if (selectItems.indexOf(selectItem) === -1) {
                selectItems.push(selectItem);
              }
              data.selectStartMatch = selectItems;
            }
          });

          // Somando os nomes dos grupos

          groupItems.forEach((labelPart, lblIdx) => {
            if (line[labelPart]) {
              if (
                labels.indexOf(labelPart) === -1 &&
                groupItems[lblIdx + 1] !== undefined
              ) {
                labels.push(
                  line[groupItems[lblIdx]] + " " + line[groupItems[lblIdx + 1]]
                );
              }
            }
          });

          // Somando os nomes aos select

          labels.forEach((label, labelIdx) => {
            selectItems.forEach((selectItem, selectIdx) => {
              if (finalLabels.indexOf(label + " " + selectItem) === -1) {
                finalLabels.push(label + " " + selectItem);
              }
            });
          });

          // Pegando os valores

          start.select.forEach((selectItem, selectIdx) => {
            if (line[selectItem]) {
              values.push(line[selectItem]);
            }
          });

          // Tentando deixar os valores em arrays 2 a 2

          treatedValues = values.reduce((resultArray, valueSet, i) => {
            const chunkIndex = Math.floor(
              i / (values.length / selectItems.length)
            );

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = []; // start a new chunk
            }

            resultArray[chunkIndex].push(valueSet);

            return resultArray;
          }, []);
        }
      });

      this.setState({
        start: start,
        span: span,
        stop: stop,
        treatedLabels: finalLabels,
        treatedData: treatedValues,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleOnChange(value) {
    this.setState({ input: value });
  }
  render() {
    // console.log(this.state.treatedLabels);
    return (
      <div>
        <CodeInput handleOnChange={this.handleOnChange} />
        <ChartView
          labels={this.state.treatedLabels}
          data={this.state.treatedData}
        />
        <Footer handleOnClick={this.handleOnClick} />
      </div>
    );
  }
}

export default ChartPlotter;
