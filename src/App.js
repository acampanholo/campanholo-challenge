import React from "react";
import ChartPlotter from "./components/ChartPlotter/ChartPlotter";
import Header from "./components/Header/Header";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ChartPlotter />
      </div>
    );
  }
}

export default App;
