import EnvelopConfig from "../components/envelop-config";
import Head from "next/Head";
import { useState } from "react";

export default function Bach(props) {
  const [settings, setSettings] = useState({
    envelope: {
      attack: 0.5,
      decay: 0.5,
      release: 0.1,
      sustain: 0.5,
    },
    volume: {
      min: 0,
      max: 3,
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
        defaults={settings.envelope}
        onInput={updateAttribute}
      ></EnvelopConfig>
      <piano-keyboard
        attack={settings.envelope.attack}
        release={settings.envelope.release}
        decay={settings.envelope.decay}
        sustain={settings.envelope.sustain}
      ></piano-keyboard>
    </>
  );
}
