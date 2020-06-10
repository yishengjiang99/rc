import styles from "./sequence.module.css";
import React from "react";
import { useState, useEffect } from "react";

const Sequence = ({ rows, cols }) => {
  const [track, setTrack] = useState([]);
  const [bpm, setBpm] = useState(133);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [start, setStart] = useState(new Date().getTime());

  const startTimer = function (reset) {
    if (reset) {
      setT(0);
    }
    setStart(new Date().getTime());
    requestAnimationFrame(() => {
      const now = new Date().getTime();
      setT(now - start);
    });
  };
  const pushNote = (note) => {
    if (running == false) {
      startTimer();
    }
    track.push({ note: note, time: t });
    setTrack(track);
  };
  useEffect(() => {
    window.onmessage = (e) => {
      var msgJson = e.data;
      debugger;
      alert(JSON.stringify(msgJson));
      if (msgJson.onNote) {
        pushNote(msgJson);
      }
    };
  });
  const grids = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grids.push(
        <div
          key={i * cols + j}
          className={styles.gridItem}
          style={{ gridRow: i, gridColume: j }}
        >
          _
        </div>
      );
    }
  }
  return (
    <>
      <div className="hud">
        {t} |
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
