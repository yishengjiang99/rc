import styles from "./sequence.module.css";
import React from "react";
import { FastRewind, FastForward, PlayArrow, Pause } from "@material-ui/icons";
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
  const startTimer = function (reset) {
    if (reset) {
      setT(0);
      setStart(new Date().getTime());
      setRunning(true);
      cancelAnimationFrame(updateTimer);
    }
    var _bar = 0;
    const interval = 60000 / bpm / 4;

    const playBeat = () => {
      if (track[_bar]) {
        window.postMessage({ source: "sequence", triggerAttack: track[_bar] });
      }
      _bar++;
      setTimeout(playBear, interval);
    };

    setTimeout(function () {}, 60000 / bpm / 4);

    var update = () => {
      updateTimer = requestAnimationFrame(() => {
        const now = new Date().getTime();
        const time = (now - start) / 1000;

        const bar = Math.floor((time / 60) * bpm * 4); // / (bpm * 60)) * 4);
        console.log("am frame " + time, bar);

        if (bar !== t) setT(bar);
        if (bar - barCursor >= cols) {
          setBarCursor(barCursor + cols);
        }
        if (playbackState == PlaybackStateEnum.playing) {
          var notes = track[bar] || [];
          notes.forEach((note) => {
            // litKeys[bar] = 1;
            window.postMessage({ source: "sequence", triggerAttack: note });
          });
          // Object.keys(litKeys).forEach((key) => {
          //   if (track[bar].indexOf(key) < 0) {
          //     window.postMessage({ source: "sequence", triggerRelease: key });
          //   }
          // });
          setLitKeys(track[bar]);
        }
        update();
      });
    };
    update();
  };

  const pushNote = (note) => {
    if (playbackState === PlaybackStateEnum.playing) {
      setMsg("cannot push note during playback");
      return;
    }
    // if (!running) {
    //   startTimer();
    // }

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
    setPlaybackState(PlaybackStateEnum.playing);
    startTimer(true);
    // var b = 0;

    // for (const _bar in track) {
    //   const bars = track[_bar];
    //   if (bars) {
    //     window.postMessage({ triggerAttackRelease: bars, source: "sequence" });
    //   }
    //   await sleep( 60000/bpm/4);
    // }
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
      grids.push(<div key={j * cols + i} className={className}></div>);
    }
  }
  return (
    <>
      <Toolbar ref={toolbarRef}>
        <IconButton>
          <FastRewind />
        </IconButton>
        <IconButton onClick={() => pauseTimer()}>
          <Pause />
        </IconButton>
        <IconButton onClick={() => playback()}>
          <PlayArrow />
        </IconButton>
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
