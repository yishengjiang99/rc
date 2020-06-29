// import React, { useState, createElement } from "./lib/react.js";
// import { render } from "./lib/react-dom.js";
import Tone from "tone";

window.g_audioctx = new Tone();
window.onclick = window.onkeydown = async function (e) {
  if (g_audioctx.state !== "running") {
    await Tone.start();
  }
  return true; //keep goign
};

// const CtxIndicator = () => {
//   return createElement("div", {
//     className:
//       g_audioctx && g_audioctx.state === "running" ? "led-green" : "led",
//   });
// };
customElements.define(
  "audio-context-led",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.shadowRoot.innerHTML = `<div id=rct></div>`;
      render(CtxIndicator, this.shadowRoot.getElementById("rct"));
    }
  }
);
