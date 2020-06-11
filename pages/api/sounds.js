import styles from "./sequence.module.css";
import React from "react";
import {Synth} from '../lib/synth';
import {
  FastRewind,
  FastForward,
  PlayCircleFilledSharp,
  PauseCircleFilledSharp,
} from "@material-ui/icons";
import { IconButton, Toolbar } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import {render} from "react-dom";

const keyboard = (adsr, config) => {
    const adsr = {
        attack: 0.02,
        decay: 0.04,
        sustain: 0.4,
        release: 0.5, //0.01
      };
      const config={
        maxVolume,
        waveshaper,
        gain1,
        gain2,
        gain3,
        onNote,
        onNoteOff 
    } = config;

  const [keyboardState, setKeyboardState] = useState({
    playback: false,
    tracks: [],
    time_sec: 0,
    track_page: 0,
    notes_attacking: {},
  });
  render(){
      <ul>{
        notes.
      }</ul>
  }
};
