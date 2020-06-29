var n = -2;
var interval = interval;
var t;

onmessage = ({ data }) => {
  if (data.interval) {
    interval = data.interval;
    var n = 0;
    t = setInterval(function () {
      postMessage(n++);
    }, interval);
  }

  if (data == "stop") {
    clearInterval(t);
  }
};

postMessage("load");
