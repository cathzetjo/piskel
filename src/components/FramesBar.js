import React, { Component, Fragment } from 'react';
import FramePreview from './Frames';

export default class FramesBar extends Component {
  render() {
    return (
      <Fragment>
        <div id="frames-bar" className="frames-bar">
          {this.props.frames.map(frame => <FramePreview key={frame.id}
            number={frame.number}
            onDeleteFrame={this.props.onDeleteFrame.bind(this)}
            img={frame.img[this.props.number]}
            delegateFrame={this.props.delegateFrame}
            isActive={frame.number === this.props.activeFrame}
            onSetActiveFrame={this.props.onSetActiveFrame.bind(this)}
            setDelegateFrame={this.props.setDelegateFrame.bind(this)}
            changeFramePos={this.props.changeFramePos.bind(this)}
            copyFrame={this.props.onCopyFrame.bind(this, frame.img, frame.number)}
            canvasSize={this.props.canvasSize}/>)}
          <button className="frames-bar-add-new-frame-btn" onClick={this.props.onAddNewFrame.bind(this)}>+</button>
        </div>
      </Fragment>
    );
  }
}
