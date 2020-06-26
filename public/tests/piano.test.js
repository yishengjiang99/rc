import { PianoKeyboard } from "../keyboard/piano.js";
var piano = new PianoKeyboard();
var context = new AudioContext();
document.body.appendChild(piano);

document.querySelector("button").onclick = function (e) {
  context.resume().then(() => {
    window.ctx = context;
    window.ctx = context;
    const env = piano._getNote(200);
    env.trigger(ctx.currentTime);
    env.triggerRelease(ctx.currentTime + 0.1);

    const env2 = piano._getNote(33);
    env.trigger(ctx.currentTime + 0.4);
    env.triggerRelease(ctx.currentTime + 0.41);
  });
};
// var data = {
//   playTrack: {
//     0: [3],
//     1: [4],
//     2: [1],
//     3: [3],
//     4: [4],
//     5: [1],
//   },
// };
// window.postMessage({ playTrack: data.playTrack });
