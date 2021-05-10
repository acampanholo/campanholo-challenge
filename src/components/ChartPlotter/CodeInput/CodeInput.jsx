import React from "react";
import AceEditor from "react-ace";

import "./CodeInput.css";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";

class CodeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AceEditor
        className="code-input"
        mode="typescript"
        theme="monokai"
        height="250px"
        width="auto"
        onChange={this.props.handleOnChange}
        fontSize={16}
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
