import react from "react";
import Envelope from "./Envelope";
import { genericConfig } from "../components/envelop-config";

export class Bus {
  constructor(ctx, props) {
    const defaults = {
      lfoFreq: 10,
      hpFreq: 30,
      lpFreq: Math.pow(2, 16),
      gain: 1,
      compress: {
        threshold: -60,
        knee: 30,
        ratio: 12,
        attack: 0.1,
        release: 12,
      },
    };
    this.state = {
      ...defaults,
      ...props,
      ctx,
    };

    const { lfoFreq, lpFreq, hpFreq, gain, compress } = this.state;
    this.input = new GainNote(ctx);
    this.output = new GainNode(ctx);
    this.lfo = new OscillatorNode(ctx, {
      frequency: lfoFreq,
      type: "sine",
    });
    this.hpf = new BiquadFilterNode(ctx, {
      frequency: hpFreq,
      type: "highpass",
    });
    this.lpf = new BiquadFilterNode(ctx, {
      frequency: lpFreq,
      type: "lowpass",
    });
    this.lfo.connect(this.output.gain);
    this.compression = new DynamicsCompressorNode(ctx, this.state.compress);
    this.input
      .connect(this.hpf)
      .connect(this.compression)
      .connect(this.lpf)
      .connect(output);
  }

  attachSource(sourceNode) {
    sourceNode.connect(this.input);
  }
  connect(output) {
    this.output;
  }

  init() {
    this.input = new GainNote(ctx);
    this.output = new GainNode(ctx);
    this.lfo = new OscillatorNode(ctx, {
      frequency: lfoFreq,
      type: "sine",
    });
    this.hpf = new BiquadFilterNode(ctx, {
      frequency: hpFreq,
      type: "highpass",
    });
    this.lpf = new BiquadFilterNode(ctx, {
      frequency: lpFreq,
      type: "lowpass",
    });
    this.compression = new DynamicsCompressorNode(ctx, this.state.compress);
    this.input
      .connect(this.hpf)
      .connect(this.compression)
      .connect(this.lpf)
      .connect(output);

    // this.envelop = this.state.envelop || new Envelope(0, 1, this.state.adsr);
    // this.envelop.connect(output.gain);
  }
}

export const BusUI = () => {};
