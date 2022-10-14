import { drawLine } from './drawing';

const startPos = {
  x: 0,
  y: 0,
};

export function mouseDown() {
  startPos.x = this.state.mouse.x;
  startPos.y = this.state.mouse.y;
}

export function mouseMove() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  drawLine.bind(this)(startPos.x, startPos.y, startPos.x, this.state.mouse.y);
  drawLine.bind(this)(startPos.x, this.state.mouse.y, this.state.mouse.x, this.state.mouse.y);
  drawLine.bind(this)(this.state.mouse.x, this.state.mouse.y, this.state.mouse.x, startPos.y);
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, startPos.y);
}

export function mouseUp() {
  this.context = this.canvas.getContext('2d');
  drawLine.bind(this)(startPos.x, startPos.y, startPos.x, this.state.mouse.y);
  drawLine.bind(this)(startPos.x, this.state.mouse.y, this.state.mouse.x, this.state.mouse.y);
  drawLine.bind(this)(this.state.mouse.x, this.state.mouse.y, this.state.mouse.x, startPos.y);
  drawLine.bind(this)(startPos.x, startPos.y, this.state.mouse.x, startPos.y);
}
