/* eslint-disable no-case-declarations */
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import Bitmaps from "./bitmaps";
export const beats_per_page = 30;

export const initialState = {
  events: [],
  activeNotes: 0x0000,
  bar: 0,
  page: 0,
  isPlaying: false,
  bpm: 69,
  sequenceStart: 0,
  lastEvent: null,
  bitmap: new Bitmaps(beats_per_page, 12),
};
export const defaultSettings = {
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
};

export const trackReducer = (state, action) => {
  switch (action.type) {
    case "hold":
    case "release":
      return {
        ...state,
        events: state.events.concat([action]),
      };

    case "trigger":
      const events = state.events.concat([action]);
      var bb = state.bitmap;
      const page = state.bar >= beats_per_page ? state.page + 1 : state.page;
      const bar = state.bar >= beats_per_page ? 0 : state.bar + 1;
      if (action.type === "trigger") {
        bb.markLit(bar, action.noteIndex);
      }
      return {
        ...state,
        events: state.events.concat([action]),
        bitmap: bb,
        page,
        bar,
      };
    default:
      return state;
  }
};
