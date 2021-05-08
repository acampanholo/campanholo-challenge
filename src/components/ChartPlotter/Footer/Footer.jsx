import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <form>
          <button onClick={this.props.handleOnClick}>GENERATE CHART</button>
        </form>
      </footer>
    );
  }
}

export default Footer;
