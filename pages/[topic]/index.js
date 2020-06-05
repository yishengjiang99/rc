import Layout, { siteTitle } from "../../components/layout";
import fetch from "node-fetch";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Head from "next/head";
import SkipNextIcon from "@material-ui/icons/SkipNext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function MediaControlCard({ video }) {
  const { thumbnail, title, channel, vid } = video;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardHeader>{title}</CardHeader>
      <CardMedia className={classes.cover} image={thumbnail} title={title} />

      <div className={classes.controls}>
        <IconButton aria-label="previous">
          {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
        </IconButton>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon className={classes.playIcon} />
        </IconButton>
        <IconButton aria-label="next">
          {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
        </IconButton>
      </div>
    </Card>
  );
}
export default function Topic(props) {
  console.log(props);
  const intervalRef = useRef();

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        "https://dsp.grepawk.com/api/yt/" + props.topic
      );
      const json = await response.json();
      setVideos(json);
    }
    fetchProduct();
  }, []);

  return (
    <Layout>
      <Head></Head>

      {videos.map((v) => (
        <MediaControlCard video={v} />
      ))}
    </Layout>
  );
}

// export async function getStaticProps({ params }) {
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// }
