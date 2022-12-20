import React, { Component } from "react";

import "./Loading.css";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDots: ".",
      interval: null,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      switch (this.state.currDots) {
        case ".":
          this.setState({ currDots: ".." });
          break;
        case "..":
          this.setState({ currDots: "..." });
          break;
        case "...":
          this.setState({ currDots: "." });
          break;
        default:
          this.setState({ currDots: "." });
          break;
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="modal show-modal">
        <div className="modal-content">
          <h1>{`Loading${this.state.currDots}`}</h1>
          {/* <h1>{this.state.currDots}</h1> */}
        </div>
      </div>
    );
  }
}

export default Loading;
