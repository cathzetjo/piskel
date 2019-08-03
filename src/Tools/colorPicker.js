function toHex(c) {
  const hex = c.toString(16);
  if (hex.length === 1) {
    return `0${hex}`;
  }
    return hex;

}

function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function mouseDown() {
  const pixelData = this.canvas.getContext('2d').getImageData(this.state.mouse.x, this.state.mouse.y, 1, 1).data;
  const main = document.querySelector('.first-color');
  main.value = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
  this.props.setFirstColor(pixelData[0], pixelData[1], pixelData[2]);
}
