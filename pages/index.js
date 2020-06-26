import dynamic from "next/dynamic";
import LeftNav from "../components/leftnav";
import Bach from "../components/Bach";

import { Container } from "@material-ui/core";
import Sequence from "../components/sequence";
import Playlist from "../components/Playlist";

export default function indexPage(props) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <LeftNav></LeftNav>
      <Container>
        <Sequence rows={12} cols={20} />
        <Bach />
      </Container>
      q
    </>
  );
}
