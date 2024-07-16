import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Menu from "../Menu";
import Footer from "../Footer";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
}
