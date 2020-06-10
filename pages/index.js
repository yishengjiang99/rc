import dynamic from "next/dynamic";
import LeftNav from "../components/leftnav";
import Bach from "../components/bach";
import { Container } from "@material-ui/core";
import Sequence from "../components/sequence";
import NoSsr from "@material-ui/core/NoSsr";

const PlayListNoSsr = dynamic(() => import("../components/playlist"), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
});

export default function indexPage(props) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <NoSsr>
      <LeftNav>
        <PlayListNoSsr api="/api/fs/sound" />;
        <PlayListNoSsr api="/api/fs/sound/notes" mode="buttons" />;
      </LeftNav>
      <Container>
        <Sequence rows={12} cols={20} />
        <Bach />
      </Container>
    </NoSsr>
  );
}
