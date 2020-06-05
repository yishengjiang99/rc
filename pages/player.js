import { Media, Player, controls, utils } from "react-media-player";
const {
  PlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen,
} = controls;
const { keyboardControls } = utils;

export default function PlayerPager(props) {
  return (
    <Media>
      <div className="media">
        <div className="media-player">
          <Player src="http://dsp.grepawk.com/video.webm" />
        </div>
        <div className="media-controls">
          <PlayPause />
          <CurrentTime />
          <Progress />
          <SeekBar />
          <Duration />
          <MuteUnmute />
          <Volume />
          <Fullscreen />
        </div>
      </div>
    </Media>
  );
}
