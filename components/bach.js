import EnvelopConfig from "./envelop-config";

import Head from "next/head";
import { useState } from "react";
import { OSC3, Envelope } from "../lib/synth";
import { PianoKeys } from "../components/keyboard";

import {
  Card,
  Collapse,
  CardMedia,
  CardHeader,
  ChardContent,
  IconButton,
  Box,
} from "@material-ui/core";
// import "../public/keyboard/piano.js";
export default function Bach(props) {
  const [settings, setSettings] = useState({
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1, //0.01
    },
    volume: {
      min: 0,
      max: 6,
    },
  });
  function updateAttribute(attribute, value) {
    setSettings({
      ...settings,
      attribute: value,
    });
  }
  return (
    <>
      <details>
        <summary>AM ADSR</summary>
        <EnvelopConfig
          style={{ maxWidth: "200px" }}
          defaults={settings.envelope}
          onInput={updateAttribute}
        ></EnvelopConfig>
      </details>
      <PianoKeys
        attack={settings.envelope.attack}
        release={settings.envelope.release}
        decay={settings.envelope.decay}
        sustain={settings.envelope.sustain}
      ></PianoKeys>
    </>
  );
}
