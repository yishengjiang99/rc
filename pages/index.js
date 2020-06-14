import EnvelopConfig from "../components/envelop-config";
import Sequence from "../components/sequence";
import { Container } from "@material-ui/core";
import { useState } from "react";
import { NoSsr } from "@material-ui/core";
//trigger update

const LeftNav = ({ children }) => {
  return <span>{children}</span>;
};
export default function indexPage(props) {
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
    <Container>
      <Sequence rows={12} cols={20} />
      <NoSsr>
        <LeftNav>
          <EnvelopConfig
            style={{ maxWidth: "200px" }}
            defaults={settings.envelope}
            onInput={updateAttribute}
          ></EnvelopConfig>
        </LeftNav>

        <piano-keyboard
          attack={settings.envelope.attack}
          release={settings.envelope.release}
          decay={settings.envelope.decay}
          sustain={settings.envelope.sustain}
        ></piano-keyboard>
      </NoSsr>
    </Container>
  );
}
