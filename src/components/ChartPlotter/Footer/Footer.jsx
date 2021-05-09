import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <button onClick={this.props.handleOnClick}>GENERATE CHART</button>
      </footer>
    );
  }
}

export default Footer;
