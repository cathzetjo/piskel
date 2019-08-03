import { drawLine, drawPixel } from './drawing';

export function mouseDown(e) {
  e.persist();
  this.context = this.canvas.getContext('2d');
  this.lastHlPixel = undefined;

  drawPixel.bind(this, this.state.mouse.x, this.state.mouse.y)();
}

export function mouseMove() {
  this.context = this.canvas.getContext('2d');
  if (this.state.mouse.x > this.state.mouseOld.x + 1
      || this.state.mouse.x < this.state.mouseOld.x - 1
      || this.state.mouse.y > this.state.mouseOld.y + 1
      || this.state.mouse.y < this.state.mouseOld.y - 1) {
    drawLine.bind(this)(this.state.mouseOld.x, this.state.mouseOld.y, this.state.mouse.x, this.state.mouse.y);
  } else {
    drawPixel.bind(this)(this.state.mouse.x, this.state.mouse.y);
  }
}

export function mouseUp() {
  this.context = this.canvas.getContext('2d');
  drawPixel.bind(this)(this.state.mouse.x, this.state.mouse.y);
}
