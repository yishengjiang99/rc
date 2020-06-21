import EnvelopConfig from "../components/envelop-config";
import Sequence from "../components/sequence";
import { Container } from "@material-ui/core";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import {
  trackReducer,
  beats_per_page,
  defaultSettings,
  initialState,
} from "../lib/trackstore";

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};
const LeftNav = ({ children }) => {
  return <span>{children}</span>;
};

export default function indexPage(props) {
  const [settings, setSettings] = useState(defaultSettings);

  function updateAttribute(attribute, value) {
    setSettings({
      ...settings,
      attribute: value,
    })
  };

  const isMounted = useIsMounted();
  const [trackState, trackDispatch] = useReducer(trackReducer, initialState);
  const { events, bar, page, bitmap } = trackState;

  useEffect(() => {
    window.onmessage = ({ data }) => {
      if (data.source === "trackdispatch"){
        trackDispatch(data);
      }
    }

  return (
    <Container>
      <LeftNav>
        <EnvelopConfig
          style={{ maxWidth: "200px" }}
          defaults={settings.envelope}
          onInput={updateAttribute}
        ></EnvelopConfig>
      </LeftNav> 

      <Sequence
        trackDispatch={trackDispatch}
        bitmap={bitmap} //vents.length > 0 && events[events.length - 1]}
        currentBar={trackState.bar}
        page={page}
        rows={12}
        cols={beats_per_page}
      />

      {isMounted  && (
        <piano-keyboard
          trackDispatch={trackDispatch}
          attack={settings.envelope.attack}
          release={settings.envelope.release}
          decay={settings.envelope.decay}
          sustain={settings.envelope.sustain}
        ></piano-keyboard>
      )}
    </Container>
  +