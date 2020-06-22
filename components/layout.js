import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "./layout.module.css";
import { Repeat } from "@material-ui/icons";


const Layout = ({ children }) => {
  return (
    <div class={styles.container}>
      {children[0]}
      {children[0]}
      {children[0]}
    </div>
  );
};


export default Layout;
