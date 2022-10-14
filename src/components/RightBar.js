import React, { Component } from 'react';

export default class RightBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      FPS: 1,
    };
    this.changeFPSNumber = this.changeFPSNumber.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
  }

  startAnimation(time) {
    this.interval = setInterval(() => {
      this.frames = document.querySelectorAll('.frames-bar-frame-preview-canvas');
      const images = document.querySelector('.animation-preview-img');
      images.src = this.frames[this.state.number].toDataURL();
      this.setState({
        number: this.state.number += 1,
      });

      if (this.state.number === this.frames.length) {
        this.setState({
          number: this.state.number = 0,
        });
      }
    }, time);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.FPS !== prevState.FPS) {
      clearInterval(this.interval);
      this.startAnimation(1000 / this.state.FPS);
    }
  }

  changeFPSNumber() {
    const range = document.querySelector('.range');
    this.setState({
      FPS: range.value,
    });
  }

  static fullScreen() {
    const context = document.querySelector('.full-screen-btn');
    const element = document.documentElement;
    if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    if (context.innerHTML !== 'exit full screen') {
      context.innerHTML = 'exit full screen';
    } else { context.innerHTML = 'full screen'; }
  }

  render() {
    return (
      <div className='right-bar'>
        <div className='animation-preview'><img className='animation-preview-img' alt=""/></div>
        <div className='fps-slider'>
          <label htmlFor="range" className='fps-num'>{this.state.FPS} FPS </label>
          <input className='range' id="range" type="range" min="1" max="24" step="1" defaultValue="1"
            onChange={this.changeFPSNumber}/>
        </div>
        <div className="full-screen">
          <button className='full-screen-btn' onClick={RightBar.fullScreen}>full screen</button>
        </div>
      </div>
    );
  }
}
