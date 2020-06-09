import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Card,
  InputLabel,
  CardHeader,
  CardContent,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import Select from "react-select";

const defaultSound = {
  value: "/sound/song.mp3",
  label: "song.mp3",
};
function chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}
const BgSound = ({ src, userTriggered, index }) => {
  const [inputNode, setInputNode] = useState(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioCtx) {
      if (userTriggered) setAudioCtx(window.audioCtx());
    } else if (!inputNode) {
      if (audioRef.current) {
        const node = audioCtx.elementInput(audioRef.current, index);
        setInputNode(node);
      }
    } else if (userTriggered) {
      audioRef.current.oncanplay = function (e) {
        e.target.play();
      };
    }
  });
  return <audio ref={audioRef} src={src} controls />;
};
function basename(path) {
  if (!path) return "";
  var t = path.split("/");
  return t[t.length - 1].split(" - ")[0];
}
const Playlist = (props) => {
  const apiUrl = props.api || "/api/fs/sound";
  const [sounds, setSounds] = useState(null);
  const [userTriggered, setUserTriggered] = useState(false);
  const [nowPlaying, setNowPlaying] = useState("/sound/song.mp3");
  const [bufferState, setBufferState] = useState("UNSENT");

  useEffect(() => {
    const fetchSounds = async () => {
      const soundsJson = await fetch(apiUrl);
      const soundsArray = await soundsJson.json(); //.then((res) => res.json());
      setSounds(soundsArray);
    };
    if (!sounds) fetchSounds();
  });

  const soundButtons = (sounds) => {
    return (
      <>
        {chunk(sounds, 3).map((chk) => {
          return (
            <ButtonGroup
              size="large"
              color="primary"
              aria-label="large outlined primary button group"
            >
              {chk.map((sound) => {
                return (
                  <Button
                    onClick={(e) => {
                      setUserTriggered(true);
                      setNowPlaying(sound);
                    }}
                  >
                    {basename(sound)}
                  </Button>
                );
              })}
            </ButtonGroup>
          );
        })}
      </>
    );
  };
  const soundSelectBar = (sounds) => {
    return (
      <select
        onInput={(e) => {
          setUserTriggered(true);
          setNowPlaying(e.target.value);
        }}
      >
        {sounds &&
          sounds.map((url) => {
            return (
              <option key={url} value={url}>
                {basename(url)}
              </option>
            );
          })}
      </select>
    );
  };
  return (
    <Card>
      <CardHeader title={basename(nowPlaying)} />
      <CardContent>
        <BgSound
          index={props.index || 0}
          userTriggered={userTriggered}
          src={nowPlaying}
        />
        <div>
          {sounds &&
            (props.mode && props.mode == "buttons"
              ? soundButtons(sounds)
              : soundSelectBar(sounds))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Playlist;
// export const Playlist = dynamic(
//   ()=>_Playlist,
//   {ssr:false}
// }
