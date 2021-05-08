import React from "react";
import AceEditor from "react-ace";

import "./CodeInput.css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";

class CodeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AceEditor
        className="code-input"
        mode="json"
        theme="twilight"
        height="200px"
        width="auto"
        onChange={this.props.handleOnChange}
        fontSize={14}
        showPrintMargin={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    );
  }
}

export default CodeInput;
