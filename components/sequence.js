import styles from "./sequence.module.css";
import React from "react";
import {
  FastRewind,
  FastForward,
  PlayCircleFilledSharp,
  PauseCircleFilledSharp,
} from "@material-ui/icons";
import { IconButton, Toolbar } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
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
const Sequence = ({ rows, cols }) => {
  const [track, setTrack] = useState({});
  const [bpm, setBpm] = useState(133);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [start, setStart] = useState(new Date().getTime());
  const [barCursor, setBarCursor] = useState(0);
  const [playbackState, setPlaybackState] = useState(PlaybackStateEnum.initial);
  const [msg, setMsg] = useState("");
  const [litKeys, setLitKeys] = useState({});
  var updateTimer;
  const toolbarRef = useRef();

  const pushNote = (note) => {
    if (playbackState === PlaybackStateEnum.playing) {
      setMsg("cannot push note during playback");
      return;
    }
    const noteIndex = notes.indexOf(note);
    setMsg(`push ${t} with ${noteIndex}`);
    track[t] = track[t] || [];
    track[t].push(noteIndex);
    setTrack(track);
    setT(t + 1);
    if (t - barCursor > cols) {
      setBarCursor(barCursor + cols);
    }
  };

  const pauseTimer = () => {
    setRunning(false);
    setPlaybackState(PlaybackStateEnum.paused);
    cancelAnimationFrame(updateTimer);
  };
  const playback = () => {
    window.postMessage({ triggerAttackRelease: track, source: "sequence" });
    setPlaybackState(PlaybackStateEnum.playing);
  };

  useEffect(() => {
    window.onmessage = (e) => {
      var msg = e.data;

      if (msg.trigger) {
        pushNote(msg.trigger);
      } else if (msg.onNoteOff) {
        _console.log(msg);
      } else if (msg.onNoteHold) {
        _console.log(msg);
      }
    };
    // toolbarRef.current.style.display = "block";
    return function () {
      cancelAnimationFrame(updateTimer);
      window.onmessage = null;
    };
  });
  const grids = [];
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols; j++) {
      var bars = track[j + barCursor] || [];

      const keyLit = bars.indexOf(i) >= 0;
      const className = keyLit
        ? `${styles.gridItem} ${styles.noteOn}`
        : styles.gridItem;
      grids.push(
        <div
          onClick={(e) => {
            var bars = track[j + barCursor] || [];
            keyLit ? bars.splice(bars.indexOf(i), 1) : bars.push(i);
            track[j + barCursor] = bars;
            setTrack(track);
            setMsg("update" + (j * cols + i));
          }}
          key={j * cols + i}
          className={className}
        ></div>
      );
    }
  }
  return (
    <>
      <Toolbar ref={toolbarRef}>
        <IconButton>
          <FastRewind />
        </IconButton>
        {playbackState === PlaybackStateEnum.playing ? (
          <IconButton onClick={() => pauseTimer()}>
            <PauseCircleFilledSharp />
          </IconButton>
        ) : (
          <IconButton onClick={() => playback()}>
            <PlayCircleFilledSharp />
          </IconButton>
        )}
        <IconButton>
          <FastForward />
        </IconButton>
      </Toolbar>
      <div className="hud">
        {t} | {running ? "running" : "no"}
        <input
          type="number"
          aria-label="bpm"
          value={bpm}
          onChange={(e, v) => {
            setBpm(v);
          }}
        />
      </div>
      <div className={styles.gridContainer}>{grids}</div>
      <div>{JSON.stringify(track)}</div>
    </>
  );
};
function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
export default Sequence;
