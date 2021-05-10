import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import ChartPlotter from "./components/ChartPlotter/ChartPlotter";
import CodeInput from "./components/ChartPlotter/CodeInput/CodeInput";
import ChartView from "./components/ChartPlotter/ChartView/ChartView";
import Footer from "./components/ChartPlotter/Footer/Footer";

it("renders whithout crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders whithout crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChartPlotter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders whithout crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CodeInput />, div);
});
it("renders whithout crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChartView />, div);
});
it("renders whithout crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Footer />, div);
});
