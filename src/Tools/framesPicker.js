export function addNewFrame(fn) {
  const imgArr = [];
  this.setState((state, props) => ({
    frames: [...state.frames, {
      number: state.frames.length,
      id: state.frames.length,
      img: imgArr,
    }], //  makes active the last frame
  }),
  () => { this.setActiveFrame(this.state.frames.length - 1); });
}

export function setActiveFrame(num) {
  this.setState({
    activeFrame: num,
  }, () => {
    const canvas = document.getElementById('main-canvas');
    const context = canvas.getContext('2d');
    const img = this.state.frames[this.state.activeFrame].img[undefined];

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (img !== undefined) {
      context.putImageData(img, 0, 0);
    }
  });
}

export function deleteFrame(num) {
  if (this.state.frames.length > 1) {
    if (this.state.activeFrame > num) {
      this.setState((state, props) => ({ activeFrame: state.activeFrame - 1 }));
    }
    if (this.state.activeFrame === num) {
      this.setActiveFrame(this.state.activeFrame - ((this.state.activeFrame) ? 1 : 0));
    }

    let framesTmp = this.state.frames;
    framesTmp.splice(num, 1);
    framesTmp = framesTmp.map((frame) => {
      if (frame.number > num) {
        return {
          number: frame.number - 1,
          id: frame.id - 1,
          img: frame.img,
        };
      }
      return frame;
    });
    this.setState({
      frames: framesTmp,
    });
  } else {
    const { frames } = this.state;
    frames[0].img = undefined;
    this.setState({ frames });
    this.setActiveFrame(0);
  }
}

export function copyFrame(img, num) {
  const { frames } = this.state;
  frames.splice(num + 1, 0, { number: num + 1, id: num + 1, img });
  for (let i = num + 2; i < frames.length; i += 1) {
    frames[i].number += 1;
    frames[i].id += 1;
  }
  this.setState({ frames });
}

export function updateFramePreview(w, h) {
  const mainCanvasContex = document.getElementById('main-canvas').getContext('2d');
  const img = mainCanvasContex.getImageData(0, 0, w, h);
  const frameTemp = this.state.frames;
  frameTemp[this.state.activeFrame].img[undefined] = img;
  this.setState({
    frames: frameTemp,
  });
}

export function setDelegateFrame(num, fn) {
  this.setState({ delegateFrame: num });
}

export function changeFramePos(from, to) {
  let { frames } = this.state;
  const frame = frames.splice(from, 1);
  frames.splice(to, 0, frame[0]);
  frames = frames.map((fr, i) => ({ number: i, id: i, img: fr.img }));
  this.setState({ frames }, () => { this.setActiveFrame(to); });
}
