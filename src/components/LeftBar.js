import React, { Component } from 'react';

import marker from '../Assets/img/markerPen.png';
import bucket from '../Assets/img/bucket.png';
import pipette from '../Assets/img/pipette.png';
import eraser from '../Assets/img/eraser.png';
import line from '../Assets/img/line.png';
import rectangle from '../Assets/img/rectangle.png';

function toHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export default class LeftBar extends Component {
  constructor(props) {
    super(props);
    this.chooseFirstColor = this.chooseFirstColor.bind(this);
    this.chooseSecondColor = this.chooseSecondColor.bind(this);
    this.changeColors = this.changeColors.bind(this);
  }

  componentDidMount() {
    this.first = document.querySelector('.first-color');
    this.second = document.querySelector('.second-color');
  }

  chooseFirstColor() {
    const color = hexToRgb(this.first.value);
    this.props.setFirstColor(color.r, color.g, color.b);
  }

  chooseSecondColor() {
    const color = hexToRgb(this.second.value);
    this.props.setSecondColor(color.r, color.g, color.b);
  }

  changeColors() {
    const mainColor = hexToRgb(this.first.value);
    const semiColor = hexToRgb(this.second.value);
    this.first.value = rgbToHex(semiColor.r, semiColor.g, semiColor.b);
    this.second.value = rgbToHex(mainColor.r, mainColor.g, mainColor.b);
    this.props.setFirstColor(semiColor.r, semiColor.g, semiColor.b);
    this.props.setSecondColor(mainColor.r, mainColor.g, mainColor.b);
  }

  render() {
    return (
      <div className="tools">
        <div className={`tool${(this.props.activeToolId === 0) ? ' activeTool' : ''}`}
          onClick={() => this.props.setActiveTool(0)}>
          <img src={marker} alt=""/>
        </div>
        <div className={`tool${(this.props.activeToolId === 1) ? ' activeTool' : ''}`}
          onClick={() => this.props.setActiveTool(1)}>
          <img src={bucket} alt=""/>
        </div>
        <div className={`tool${(this.props.activeToolId === 2) ? ' activeTool' : ''}`}
          onClick={() => this.props.setActiveTool(2)}>
          <img src={pipette} alt=""/>
        </div>
        <div className={`tool${(this.props.activeToolId === 3) ? ' activeTool' : ''}`}
             onClick={() => this.props.setActiveTool(3)}>
          <img src={eraser} alt=""/>
        </div>
        <div className={`tool${(this.props.activeToolId === 4) ? ' activeTool' : ''}`}
             onClick={() => this.props.setActiveTool(4)}>
          <img src={line} alt=""/>
        </div>
        <div className={`tool${(this.props.activeToolId === 5) ? ' activeTool' : ''}`}
             onClick={() => this.props.setActiveTool(5)}>
          <img src={rectangle} alt=""/>
        </div>
        <div className="color-palette">
          <input type="color"
            defaultValue={rgbToHex(this.props.firstColor.r, this.props.firstColor.g, this.props.firstColor.b)}
            onInput={this.chooseFirstColor} className="first-color color-in-use"/>
          <div className="change-img" onClick={this.changeColors}/>
          <input type="color"
            defaultValue={rgbToHex(this.props.secondColor.r, this.props.secondColor.g, this.props.secondColor.b)}
            onInput={this.chooseSecondColor} className="second-color color-in-use"/>
        </div>

      </div>
    );
  }
}
