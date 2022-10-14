import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 20,
      mouse: { x: 0, y: 0 },
      mouseOld: { x: 0, y: 0 },
    };
    this.canvasField = 1000;
    this.containerSize = this.props.canvasSize * this.state.size;
    this.Alpha = 250;
  }

  componentDidMount() {
    this.canvas = document.getElementById('main-canvas');
    this.drawingCanvas = document.getElementById('drawing-canvas');

    document.body.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.body.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  setMousePos(x, y, func) {
    this.setState((state, props) => ({
      mouseOld: {
        x: state.mouse.x,
        y: state.mouse.y,
      },
      mouse: {
        x,
        y,
      },
    }), func);
  }

  setSize(n) {
    if (n < 1 || (n * this.props.canvasSize) > 1500) return;
    this.containerSize = this.props.canvasSize * n;
    this.setState({ size: n });
  }

  onWheel(e) {
    const delta = e.deltaY;

    if (delta > 0) this.setSize(this.state.size * 0.9);
    else this.setSize(this.state.size * 1.1);
  }

  onMouseDown(e) {
    this.draw = true;
    this.context = this.drawingCanvas.getContext('2d');
    this.props.onMouseDown.bind(this, e)();
  }

  onMouseMove(e) {
    let sizeChange = 0;
    if (this.containerSize > this.canvasField) {
      sizeChange = (this.containerSize - this.canvasField) / 2;
    }

    const coordinates = {
      x: Math.floor((e.pageX - this.canvas.parentElement.offsetLeft + sizeChange) / this.state.size),
      y: Math.floor((e.pageY - this.canvas.parentElement.offsetTop + sizeChange) / this.state.size),
    };

    // mouse move to diff position => update actual coords
    if (coordinates.x !== this.state.mouse.x || coordinates.y !== this.state.mouse.y) {
      this.setMousePos(coordinates.x, coordinates.y, () => {
        this.context = this.drawingCanvas.getContext('2d');
        if (this.draw) {
          this.props.onMouseMove.bind(this, e)();
        }
      });
    }
  }

  onMouseUp(e) {
    if (this.draw) {
      this.draw = false;
      this.context = this.drawingCanvas.getContext('2d');
      this.props.onMouseUp.bind(this, e)();
      this.props.onUpdateFramePreview(this.canvas.width, this.canvas.height);
    }
  }

  render() {
    const canvasStyle = {
      transform: `scale(${this.state.size})`,
      transformOrigin: '0 0',
    };
    const backgroundStyle = {
      width: this.containerSize,
      height: this.containerSize,
    };
    if (this.containerSize > this.canvasField) {
      canvasStyle.left = `-${(this.containerSize - this.canvasField) / 2}px`;
      canvasStyle.top = `-${(this.containerSize - this.canvasField) / 2}px`;
    }
    return (
      <div className='canvas-main' onWheel={this.onWheel.bind(this)}>
        <div style={backgroundStyle} id="main-canvas-container">
          <div style={backgroundStyle} className='canvas-background'/>
          <canvas style={canvasStyle} className="canvas" id="main-canvas" width={this.props.canvasSize} height={this.props.canvasSize}/>
          <canvas style={canvasStyle} className="canvas" id="drawing-canvas" width={this.props.canvasSize} height={this.props.canvasSize}
            onMouseDown={this.onMouseDown.bind(this)}>
          </canvas>
        </div>
      </div>
    );
  }
}
