const _console = (function () {
  const debug = window.location.hash.substring(1).startsWith("debug");

  var div = document.getElementById("rx1");
  //   if (!div) {
  //   }
  //   div =
  //     div ||
  //     (debug &&
  //       document.body.append(new HTMLElement("div", { id: "console" })) &&
  //       document.getElementById("console"));
  var buffer = Array(10).fill("");
  var position = 0;
  var display = () => {
    div.innerHTML =
      buffer.slice(position % 10, 10).join("") +
      buffer.slice(0, position % 10).join("");
  };

  return {
    log: function (str) {
      if (debug) {
        var c = position % 10;
        buffer[c] = "<br>" + str;
        position++;
        display();
      }
    },
  };
})();
