export const Console = function () {
  const debug = window.location.hash.substring(1).startsWith("debug");

  var div = document.getElementById("console");
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

window.onload = () => (window._console = Console());
