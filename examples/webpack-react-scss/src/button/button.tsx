import * as React from "react";
import {Helmet} from "react-helmet";
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
    return (<div>
      <Helmet
        link={[
          {
            href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
            rel: "stylesheet",
            type: "text/css",
            media: "all"
          }
        ]}
      />
      <_Button {...this.props}> { this.props.text } </_Button>
    </div>);
  }
}
export default Button;
