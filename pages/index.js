import Playlist from "../components/Playlist";
import Sequence from "../components/Sequence";
import Bach from "../components/Bach";
import LeftNav from "../components/LeftNav";
import NoSsr from "@material-ui/core/NoSsr";
import { Container } from "@material-ui/core";
import { ls } from "../lib/posts";

export default function indexPage(props) {
  return (
    <Container>
      <Playlist files={props.mp3} />
      <Playlist files={props.notes} api="/api/fs/sound/notes" mode="buttons" />
      <NoSsr>
        <Sequence rows={12} cols={20} />
        <Bach />
      </NoSsr>
    </Container>
  );
}
export async function getStaticProps() {
  return {
    props: {
      mp3: ls("sound"),
      notes: ls("sound/notes"),
    },
  };
}
