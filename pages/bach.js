import EnvelopConfig from "../components/envelop-config";
import Head from "next/head";
import { useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import {
  Card,
  Collapse,
  CardMedia,
  CardHeader,
  ChardContent,
  IconButton,
} from "@material-ui/core";
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
      <Head>
        <script type="application/javascript" src="/_console.js"></script>

        <script type="module" src="/keyboard/piano.js"></script>
      </Head>

      <EnvelopConfig
        style={{ maxWidth: "200px" }}
        defaults={settings.envelope}
        onInput={updateAttribute}
      ></EnvelopConfig>
      <piano-keyboard
        style={{
          position: "fixed",
          height: "300px",
          bottom: 20,
          left: 0,
          width: "100vw",
        }}
        attack={settings.envelope.attack}
        release={settings.envelope.release}
        decay={settings.envelope.decay}
        sustain={settings.envelope.sustain}
      ></piano-keyboard>
    </>
  );
}
