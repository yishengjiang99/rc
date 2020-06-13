const _console =
  (window &&
    (function () {
      const debug =
        window && window.location.hash.substring(1).startsWith("debug");

      var buffer = Array(10).fill("");
      var position = 0;
      var display = () => {
        document.getElementById("console").innerHTML = buffer.join("");
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
    })()) ||
  console;
