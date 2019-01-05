import * as React from "react";
import { Button as _Button } from "react-bootstrap";
import './button.css';
interface ButtonProps {
  text?: string;
  bsStyle?: string;
}

export class Button extends React.Component<ButtonProps> {
  // Set default properties
  static defaultProps = {
    text: "Button",
    bsStyle: "default"
  };

  render() {
    return (<_Button {...this.props}> { this.props.text } </_Button>);
  }
}
export default Button;
