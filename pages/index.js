import { Playlist } from "../components/playlist";
import dynamic from "next/dynamic";
import Drawer from "@material-ui/core/Drawer";

const PlayListNoSsr = dynamic(() => import("../components/playlist"), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
});
export default function indexPage(props) {
  return (
    <Drawer open={true}>
      <PlayListNoSsr api="/api/fs/sound" />;
      <PlayListNoSsr api="/api/fs/sound/notes" mode="buttons" />;
    </Drawer>
  );
}
