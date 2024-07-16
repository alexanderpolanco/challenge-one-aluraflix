import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "../../components/Modal/Modal";
import { MiProveedor } from "./components/Context";

export default function Home() {
  return (
    <MiProveedor>
      <Header />
      <Main />
      <Modal />
    </MiProveedor>
  );
}
