import React from 'react';

class LoadingText extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ellipse: 1
    };
    this.switchText = this.switchText.bind(this);
  }

  componentWillMount() {
    setTimeout(this.switchText, 250);
  }

  switchText() {
    this.setState({ellipse: (this.state.ellipse + 1) % 3});
  }

  componentWillUnmount() {
    clearTimeout(this.switchText);
  }

  render() {
    var ellipses = ""
    for (var n = 0; n < this.state.ellipse + 1; n++) {
      ellipses += "."
    }
    return (<div className="loading-text">{'Loading' + ellipses}</div>);
  }
}

export default LoadingText;
