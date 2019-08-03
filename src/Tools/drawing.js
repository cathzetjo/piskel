export function drawPixel(x, y) {
  if (x < 0 || y < 0 || x > this.canvas.width || y > this.canvas.height) return;
  const imgData = this.context.createImageData(1, 1);
  imgData.data[0] = this.props.firstColor.r;
  imgData.data[1] = this.props.firstColor.g;
  imgData.data[2] = this.props.firstColor.b;
  imgData.data[3] = this.Alpha;
  this.context.putImageData(imgData, x, y, 0, 0, 1, 1);
}

export function drawLine(x0, y0, x1, y1) {
  let x0t = Math.floor(x0);
  let y0t = Math.floor(y0);
  const x1t = Math.floor(x1);
  const y1t = Math.floor(y1);

  const dx = Math.abs(x1t - x0t);
  const dy = Math.abs(y1 - y0t);
  const sx = (x0t < x1t) ? 1 : -1;
  const sy = (y0t < y1t) ? 1 : -1;
  let err = dx - dy;

  while (true) {
    drawPixel.bind(this)(x0t, y0t);

    if ((x0t === x1t) && (y0t === y1t)) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0t += sx; }
    if (e2 < dx) { err += dx; y0t += sy; }
  }
}
