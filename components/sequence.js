import styles from "./sequence.module.css";
import React from "react";
]
import { useState, useEffect, useRef, useReducer } from "react";

const notes = [
  261.63,
  277.18,
  293.66,
  311.13,
  329.63,
  349.23,
  369.99,
  392,
  415.3,
  440,
  466.16,
  493.88,
];
const PlaybackStateEnum = {
  initial: 0,
  recording: 1,
  paused: 2,
  playing: 3,
  ended: 4,
};

const Sequence = ({ cols, rows, currentBar, bitmap, trackDispatch }) => {
  debugger;
  const [msg, setMsg] = useState("");
  setMsg("serttin " + currentBar);
  const pushNote = (note, currentBar) => {
    if (playbackState === PlaybackStateEnum.playing) {
      setMsg("cannot push note during playback");
      return;
    }
    bitmap[currentBar] = bitmap[currentBar] | (1 << notes.indexOf(note));\
  }

    const LE_MASKS = [];

    const isLit = data(bar, noteIndex) && bar <= bitmap.length;
    if (bar > bitmap.length) return false;
    else return (bitmap[bar] & LE_MASKS[noteIndex]) >> LE_SHIFT[noteIndex];
  };

  const playback = () => {
    dispatchEvent;
    window.postMessage({
      evt: "playTrack",
      source: "sequence",
    });
    setPlaybackState(PlaybackStateEnum.playing);
  };
  const grids = [];
  for (let j = 0; j < cols; j++) {
    for (let i = rows - 1; i >= 0; i--) {
      const isBarLit = isLit(i, j);
      const className = isBarLit
        ? `${styles.gridItem} ${styles.noteOn}`
        : styles.gridItem;

      grids.push(
        <div
          onClick={() =>
            trackDispatch({
              source: "sequence",
              type: "toggleBitmap",
              noteIndex: i,
              bar: j,
            })
          }
          key={j * cols + i}
          className={className}
        ></div>
      );
    }
  }
  return (
    <>
      <Toolbar>
        <IconButton
          onClick={() => trackDispatch({ source: "sequencer", type: "rewind" })}
        >
          <FastRewind />
        </IconButton>
        {playbackState === PlaybackStateEnum.playing ? (
          <IconButton
            onClick={() =>
              trackDispatch({ source: "sequencer", type: "pause" })
            }
          >
            <PauseCircleFilledSharp />
          </IconButton>
        ) : (
          <IconButton onClick={() => playback()}>
            <PlayCircleFilledSharp />
          </IconButton>
        )}
        <IconButton
          onClick={() => trackDispatch({ source: "sequencer", type: "ff" })}
        >
          <FastForward />
        </IconButton>
      </Toolbar>

      <div className="hud">
        div classNAME:[ INIT.J]        | {currentBar} bars
        <br />
        {currentBar > 0 && bitmap[currentBar - 1].toString(2)} <br />
        {bitmap[currentBar].toString(2).split("").join(", ")}
      </div>
      <div className={styles.gridContainer}>{grids}</div>
    </>
  );
};
// function sleep(sec) {
//   return new Promise((resolve) => setTimeout(resolve, sec * 1000));
// }
export default Sequence;
