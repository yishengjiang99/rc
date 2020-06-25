var n = -2;

onmessage = ({ data }) => {
  const { bpm, bar, split } = data;
  var bpm = 60;
  var split = 4;
  var interval = (60 * 1000) / bpm / split;
  var t;
  if (data == "start") {
    ostMessage("and");
    this.n++;

    t = setInterval((e) => {
      postMessage(this.n % split);
      this.n++;
    }, interval);
  }
  if (data == "stop") {
    clearInterval(t);
  }
};
