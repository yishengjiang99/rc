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
import { trackReducer, beats_per_page } from "../lib/trackstore";

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};
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
      max: 1,
    },
  });
  function updateAttribute(attribute, value) {
    setSettings({
      ...settings,
      attribute: value,
    });
  }
  const initialState = {
    events: [],
    activeNotes: 0x0000,
    bitmap: new Uint16Array(beats_per_page),
    currentPage: 0,
    barOnCurrentPage: 0,
    isPlaying: false,
    bpm: 120,
    sequenceState: null,
  };
  const isMounted = useIsMounted();
  const [trackState, trackDispatch] = useReducer(trackReducer, initialState);
  const {
    bitmap,
    isPlaying,
    currentPage,
    barOnCurrentPage,
    activeNotes,
    events,
  } = trackState;
  useEffect(() => {});
  return (
    <Container>
      <LeftNav>
        <EnvelopConfig
          style={{ maxWidth: "200px" }}
          defaults={settings.envelope}
          onInput={updateAttribute}
        ></EnvelopConfig>
      </LeftNav>
      <div>{JSON.stringify([barOnCurrentPage, currentPage, activeNotes])}</div>
      <canvas width={680} height={120} border={1}></canvas>
      {JSON.stringify(events)}
      {/* <Sequence bitmap={bitmap} rows={12} cols={beats_per_page} /> */}
      {isMounted ? (
        <piano-keyboard
          trackDispatch={trackDispatch}
          attack={settings.envelope.attack}
          release={settings.envelope.release}
          decay={settings.envelope.decay}
          sustain={settings.envelope.sustain}
        ></piano-keyboard>
      ) : (
        "no ssr"
      )}
    </Container>
  );
}
