import { Playlist } from "../components/playlist";
import dynamic from "next/dynamic";
import Drawer from "@material-ui/core/Drawer";
import { IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";

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
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open}>
        <IconButton display="block" onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <PlayListNoSsr api="/api/fs/sound" />;
        <PlayListNoSsr api="/api/fs/sound/notes" mode="buttons" />;
      </Drawer>
    </>
  );
}
