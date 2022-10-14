import React, { Component } from 'react';


import LeftBar from './LeftBar';
import Canvas from './Canvas';
import * as marker from '../Tools/marker';
import * as bucket from '../Tools/bucket';
import * as colorPicker from '../Tools/colorPicker';
import * as eraser from '../Tools/eraser';
import * as line from '../Tools/line';
import * as rectangle from '../Tools/rectangle';
import FramesBar from './FramesBar';
import * as frames from '../Tools/framesPicker';
import RightBar from './RightBar';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [{ number: 0, id: 0, img: [] }],
      activeFrame: 0,
      canvasSize: 32,
      firstColor: { r: 105, g: 51, b: 204 },
      secondColor: { r: 233, g: 242, b: 99 },
    };

    this.setActiveTool = this.setActiveTool.bind(this);
    this.setActiveFrame = frames.setActiveFrame.bind(this);
    this.addNewFrame = frames.addNewFrame.bind(this, undefined);
    this.deleteFrame = frames.deleteFrame.bind(this);
    this.updateFramePreview = frames.updateFramePreview.bind(this);
    this.setDelegateFrame = frames.setDelegateFrame.bind(this);
    this.changeFramePos = frames.changeFramePos.bind(this);
    this.copyFrame = frames.copyFrame.bind(this);
  }

  componentDidMount() {
    this.setActiveTool(0);
  }

  setTool(tool) {
    this.setState({
      mouseDownContainer: tool.mouseDown,
      mouseMoveContainer: tool.mouseMove,
      mouseUpContainer: tool.mouseUp,
    });
  }

  setActiveTool(toolId) {
    switch (toolId) {
    case 0:
      this.setTool(marker);
      break;
    case 1:
      this.setTool(bucket);
      break;
    case 2:
      this.setTool(colorPicker);
      break;
    case 3:
      this.setTool(eraser);
      break;
    case 4:
      this.setTool(line);
      break;
    case 5:
      this.setTool(rectangle);
      break;
    default:
      break;
    }
    this.setState({ activeToolId: toolId });
  }

  setFirstColor(r, g, b) {
    this.setState({ firstColor: { r, g, b } });
  }

  setSecondColor(r, g, b) {
    this.setState({ secondColor: { r, g, b } });
  }

  swapColors() {
    this.setState((state) => ({ firstColor: state.secondColor, secondColor: state.firstColor }));
  }

  render() {
    return (
      <main>
        <LeftBar
          setActiveTool={this.setActiveTool}
          activeToolId={this.state.activeToolId}
          firstColor={this.state.firstColor}
          secondColor={this.state.secondColor}
          setFirstColor={this.setFirstColor.bind(this)}
          setSecondColor={this.setSecondColor.bind(this)}
          swapColors={this.swapColors.bind(this)}/>
        <FramesBar
          onSetActiveFrame={this.setActiveFrame}
          activeFrame={this.state.activeFrame}
          delegateFrame={this.state.delegateFrame}
          frames={this.state.frames}
          onAddNewFrame={this.addNewFrame}
          onDeleteFrame={this.deleteFrame}
          onCopyFrame={this.copyFrame}
          setDelegateFrame={this.setDelegateFrame}
          changeFramePos={this.changeFramePos}
          canvasSize={this.state.canvasSize}/>
        <Canvas
          onUpdateFramePreview={this.updateFramePreview}
          onMouseDown={this.state.mouseDownContainer}
          onMouseMove={this.state.mouseMoveContainer}
          onMouseUp={this.state.mouseUpContainer}
          firstColor={this.state.firstColor}
          secondColor={this.state.secondColor}
          setFirstColor={this.setFirstColor.bind(this)}
          setSecondColor={this.setSecondColor.bind(this)}
          canvasSize={this.state.canvasSize}/>
        <RightBar/>
      </main>
    );
  }
}
