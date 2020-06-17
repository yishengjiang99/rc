export const _console = function () {
  const debug = true;
  var buffer = Array(10).fill("");
  var position = 0;
  const div =
    document.getElementById("console") ||
    (document.createElement("div", { id: "console" }) &&
      document.body.append(div));
  var display = () => (div.innerHTML = buffer.join(""));
  return {
    log: function (str) {
      if (typeof str === "object") {
        _console.log(JSON.stringify(str));
        return;
      }
      if (debug) {
        var c = position % 10;
        buffer[c] = "<br>" + str;
        position++;
        display();
      }
    },
  };
};
