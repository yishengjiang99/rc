import React from "react";
import { render } from "react-dom";

const Slider = (props) => {
  const defaults = {
    min: 0,
    max: 2,
    step: 0.001,
    value: 0,
  };
  const { min, max, step, value, onInput } = { ...defaults, ...props };
  return h("input", {
    type: "range",
    value,
    min,
    max,
    step,
    onInput,
  });
};

const labelRow = ([props]) => {
  return h("div", {}, { label } - { value });
};

class EnvelopConfig extends React.Component {
  constructor({ attack, decay, sustain, release }) {
    this.state = {
      attack,
      decay,
      sustain,
      release,
    };
  }
  get attributes() {
    return this.state;
  }
  handleSlider(attr, value) {
    this.setState({
      attr: value,
    });
  }
  render() {
    const { attack, decay, sustain, release } = this.state;

    const _onInput = (attr, value) => (this[attr] = value);
    return h("div", {}, [
      <labelRow label="attack" value={attack} />,
      Slider({
        value: this.attack,
        label: "attack",
        onInput: (e) => _onInput("attack", e.target.value),
      }),
      labelRow("decay", this.decay),
      Slider({
        value: this.decay,
        label: "decay",
        onInput: (e) => _onInput("decay", e.target.value),
      }),
      labelRow("sustain", this.sustain),
      Slider({
        value: this.release,
        label: "release",
        oninput: (v) => {
          this.release = v;
        },
      }),
      labelRow("release", this.release),
    ]);
  }
  render_hyphy_element(shadowRoot) {
    React.DOM(this, shadowRoot.querySelector("paper-envelope"));
  }
}
