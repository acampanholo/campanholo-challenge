import React from "react";
import CodeInput from "./CodeInput/CodeInput";
import Footer from "./Footer/Footer";
import ChartView from "./ChartView/ChartView";
import EventData from "./modules/EventData";
import EventStart from "./modules/EventStart";
import EventSpan from "./modules/EventSpan";
import EventStop from "./modules/EventStop";
import "./ChartPlotter.css";

class ChartPlotter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      treatedData: [],
      treatedLabels: [],
      finalData: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();

    let start;
    let span;
    let stop;
    let data;
    let selectItems = [];
    let groupItems = [];
    let labels = [];
    let finalLabels = ["x"];
    let values = [];
    let spanBegin;
    let spanEnd;
    let treatedLabels = [];
    let treatedValues;

    let error;

    try {
      let convertedInput = this.state.input
        .toLowerCase()
        .replaceAll("'", "")
        .replaceAll('"', "")
        .replaceAll(/([a-z_]+)/g, '"$&"')
        .match(/\{[^}]+\}/g)
        .map(JSON.parse);

      convertedInput.every((line) => {
        if (line.type === "start" && !start) {
          start = new EventStart();
          start.group = line.group;
          start.select = line.select;
        } else if (line.type === "span" && start && !span) {
          span = new EventSpan();
          span.begin = line.begin;
          span.end = line.end;
        } else if (line.type === "stop" && span) {
          stop = new EventStop();
          stop.timestamp = line.timestamp;
          return false;
        } else if (line.type === "data" && span) {
          data = new EventData();

          // Getting group values

          start.group.forEach((groupItem) => {
            if (line[groupItem]) {
              if (groupItems.indexOf(groupItem) === -1) {
                groupItems.push(groupItem);
              }
              data.groupStartMatch = groupItems;
            }
          });

          // Getting select values

          start.select.forEach((selectItem) => {
            if (line[selectItem]) {
              if (selectItems.indexOf(selectItem) === -1) {
                selectItems.push(selectItem);
              }
              data.selectStartMatch = selectItems;
            }
          });

          // Creating first part of label with group values

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

          // Creating full label

          labels.forEach((label) => {
            selectItems.forEach((selectItem) => {
              if (finalLabels.indexOf(label + " " + selectItem) === -1) {
                finalLabels.push(label + " " + selectItem);
              }
            });
          });

          // Getting values

          start.select.forEach((selectItem) => {
            if (line[selectItem]) {
              values.push(line[selectItem]);
            }
          });

          // Splitting values array

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
        return true;
      });

      // Removing underscore

      finalLabels.forEach((label) => {
        treatedLabels.push(label.replaceAll("_", " "));
      });

      // Converting span to single number

      spanBegin = new Date(span.begin);
      spanEnd = new Date(span.end);

      // Setting span as index 0 of values array

      for (let i = 0; i < treatedValues.length; i++) {
        if (treatedValues[0][0] !== spanBegin.getMinutes()) {
          treatedValues[0].unshift(spanBegin.getMinutes());
        } else if (treatedValues[i][0] !== spanEnd.getMinutes()) {
          treatedValues[i].unshift(spanEnd.getMinutes());
        }
      }

      this.setState({
        treatedLabels: treatedLabels,
        treatedData: treatedValues,
      });

      error = document.querySelector(".error-message-format");
      error.classList.remove("display");
    } catch (error) {
      console.log("Check input format");
      error = document.querySelector(".error-message-format");
      error.classList.add("display");
      this.setState({ treatedLabels: [] });
    }
  }

  handleOnChange(value) {
    this.setState({ input: value });
  }
  render() {
    return (
      <div>
        <CodeInput handleOnChange={this.handleOnChange} />
        <div className="error-message-format">
          Error: please check your data format and try again.
        </div>
        <div className="error-message-data">
          Error: one or more select values don't have a pair. Please check your
          data and try again.
        </div>
        <ChartView
          labels={this.state.treatedLabels}
          data={this.state.treatedData}
          // finalData={this.state.finalData}
        />
        <Footer handleOnClick={this.handleOnClick} />
      </div>
    );
  }
}

export default ChartPlotter;
