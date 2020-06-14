import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

export const beats_per_page = 60;

export const initialState = {
  events: [],
  activeNotes: 0x0000,
  bitmap: new Uint16Array(beats_per_page),
  currentPage: 0,
  barOnCurrentPage: 0,
  isPlaying: false,
  bpm: 120,
  sequenceState: null,
  //   changeConfigEvent: [],
  //   currentConfig: {
  //     envelope: {
  //       attack: 0.1,
  //       decay: 0.1,
  //       sustain: 0.1,
  //       release: 0.1, //0.01
  //     },
  //     volume: {
  //       min: 0,
  //       max: 1,
  //     },
  //     LPFreq: 1500,
  //     HPFreq: 40,
  //     compression: { threshold: -80 /*dbfs*/ },
  //     overtoneGains: [1, 0.5, 0.25],
  //     dubstep: 0.05,
  //   },
};

export const trackReducer = (state, action) => {
  state.events.concat(action);
  if (action.time) {
    const time = action.time - state.sequenceStart;
    const barNumber = Math.floor((time * state.bpm * 3) / 1000);
    state.barOnCurrentPage = barNumber - state.page * beats_per_page;
    if (state.barOnCurrentPage >= beats_per_page) {
      state.page++;
      state.barOnCurrentPage = barNumber - state.page * beats_per_page;
      state.bitmap = new Uint16Array(beats_per_page);
    }
  }
  switch (action.type) {
    case "hold":
      state.bitmap[state.barOnCurrentPage] | (1 << action.noteIndex);
    // fallthrough break
    case "release":
      state.activeKeys & (1 << action.noteIndex);
    // fallthrough break;
    case "trigger":
      state.bitmap[state.barOnCurrentPage] | (1 << action.noteIndex);
      state.activeKeys | (1 << action.noteIndex);
      break;
    default:
      break;
  }
  return state;
};
// const TrackContext = createContext();

// export const TrackContextProvider = ({ children }) => {
//   const [trackState, dispatch] = useReducer(trackReducer, initialState);

//   return (
//     <TrackContext.Provider
//       value={trackState}
//       onNoteEvent={(e) => dispatch({})}
//       initialState={initialState}
//       reducer={trackReducer}
//     >
//       {children}
//     </TrackContext.Provider>
//   );
// };
