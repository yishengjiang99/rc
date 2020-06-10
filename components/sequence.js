import styles from "./sequence.module.css";
import React from "react";
import {}
import { useState, useEffect } from "react";
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
const Sequence = ({ rows, cols }) => {
  const [track, setTrack] = useState({});
  const [bpm, setBpm] = useState(133);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [start, setStart] = useState(new Date().getTime());
  const [barCursor, setBarCursor] = useState(0);
  var updateTimer;

  const startTimer = function (reset) {
    if (reset) {
      setT(0);
    }
    setStart(new Date().getTime());
    setRunning(true);
    var update = () => {
      updateTimer = requestAnimationFrame(() => {
        const now = new Date().getTime();
        const time = (now - start) / 1000;
        const bar = Math.floor((time / bpm) * 60 * 4);
        setT(bar);
        if (bar - barCursor >= cols) {
          setBarCursor(barCursor + cols);
        }
        update();
      });
    };
    update();
  };
  const pushNote = (note) => {
    if (running == false) {
      startTimer();
    }
    const barIndex = notes.indexOf(note);
    const bar = Math.floor(t / bpm);
    _console.log("adding " + note + " bar " + barIndex + " at time col: " + t);
    track[barIndex + t * rows] = 1;
    setTrack(track);
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
    return function () {
      cancelAnimationFrame(updateTimer);
      window.onmessage = null;
    };
  });
  const grids = [];
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols; j++) {
      const barKey = (j + barCursor) * rows + i;

      grids.push(
        <div
          key={barKey}
          className={`${styles.gridItem} ${track[barKey] ? styles.noteOn : ""}`}
          // style={{ gridRow: i + 1, gridColumn: j + 1 }}
        ></div>
      );
    }
  }
  return (
    <>
      <div className="hud">
        {Math.floor((t / bpm) * 60 * 4)} | running {running ? "true" : "false"}
        <input
          type="number"
          aria-label="bpm"
          value={bpm}
          onInput={(e) => {
            setBpm(e.target.value);
          }}
        />
      </div>
      <div className={styles.gridContainer}>{grids}</div>
    </>
  );
};

export default Sequence;
