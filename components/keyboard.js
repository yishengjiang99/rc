import React from "react";
import { OSC3, Envelope, keynotes } from "../lib/synth";
import {
  FastRewind,
  FastForward,
  PlayCircleFilledSharp,
  PauseCircleFilledSharp,
} from "@material-ui/icons";
import { IconButton, Toolbar } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import styles from "./keyboard.module.css";
import { kAudioContext } from "../public/gaudio.js";
export const keys = "a, w, s, e, d, f, t, g, y, h, u, j, k".split(",");

export const PianoKeys = ({ harmonicGains, fromTop, onNotePlayed }) => {
  const [adsr, setAdsr] = useState({
    attack: 0.02,
    decay: 0.04,
    sustain: 0.4,
    release: 0.5, //0.01
  });
  const [keyboardState, setKeyboardState] = useState({
    playback: false,
    harmonticity: harmonicGains || [1, 0.16, 0.32],
    tracks: 12,
    time_sec: 0,
    track_page: 0,
    playTriads: true,
  });
  const [pressedKeys, setPressedKeys] = useState({});

  const addPressedKey = (index) => {
    const envelop = OSC3(index, adsr, keyboardState.harmonticity);
    setPressedKeys({ ...pressedKeys, index: 1 });
  };
  const isblack = (key) => ["w", "e", "t", "y", "u"].indexOf(key) >= 0;

  const releasePressedKey = (index) => {
    pressedKeys[index].triggerReleasse();
    setPressedKeys({ ...pressedKeys, index: null });
  };
  var keylist = [];

  useEffect(() => {
    window.onkeydown = function (e) {
      const index = keys.indexOf(e.key);
      const envelop = OSC3(index, adsr, keyboardState.harmonticity);

      addPressedKey(index);
    };
  });
  keynotes.map((key, index) =>
    keylist.push(
      <li
        onMouseDown={(e) => {
          addPressedKey(index);
          e.preventDefault();
        }}
        onMouseUp={(e) => {
          releasePressedKey(index);
          e.preventDefault();
        }}
        id={index}
        key={index}
        className={`${styles.keys} ${isblack(key) ? "black" : "white"} ${
          pressedKeys[index] ? "pressed" : ""
        }`}
      >
        {key}
      </li>
    )
  );
  return <ul className={styles.listkeyyy}>{keylist};</ul>;
};
