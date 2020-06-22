import styles from "./sequence.module.css";
import React from "react";
import { Toolbar, IconButton } from "@material-ui/core";
import { PlayIcon } from "@material-ui/icons";
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
  const [playbackState, setPlaybackState] = useState(false);
  const [msg, setMsg] = useState("");

  const pushNote = (note, currentBar) => {
    if (playbackState === PlaybackStateEnum.playing) {
      setMsg("cannot push note during playback");
      return;
    }
    bitmap[currentBar] = bitmap[currentBar] | (1 << notes.indexOf(note));
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
      const isBarLit = bitmap.isLit(i, j);
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
        ></IconButton>
        {playbackState === PlaybackStateEnum.playing ? (
          <IconButton
            onClick={() =>
              trackDispatch({ source: "sequencer", type: "pause" })
            }
          ></IconButton>
        ) : (
          <IconButton onClick={() => playback()}></IconButton>
        )}
        <IconButton
          onClick={() => trackDispatch({ source: "sequencer", type: "ff" })}
        ></IconButton>
      </Toolbar>

      <div className="hud">{currentBar} bars</div>
      <div className={styles.gridContainer}>{grids}</div>
    </>
  );
};
// function sleep(sec) {
//   return new Promise((resolve) => setTimeout(resolve, sec * 1000));
// }
export default Sequence;
