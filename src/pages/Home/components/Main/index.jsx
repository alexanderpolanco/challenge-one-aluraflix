import { useEffect, useContext } from "react";
import { MiContexto } from "../Context/index.jsx";
import Carousel from "./components/Carousel";
import styles from "./main.module.css";
import {
  textColorFrontEnd,
  textColorbackEnd,
  textColorgestion,
  frontEndColor,
  backEndColor,
  gestionColor,
} from "../../../../main.module.css";

const Main = () => {
  const { stateVideos, findAll } = useContext(MiContexto);
  const categorias = ["Front End", "Back End", "Innovación y Gestión"];
  const textColor = [textColorFrontEnd, textColorbackEnd, textColorgestion];
  const backGroundColor = [frontEndColor, backEndColor, gestionColor];

  useEffect(() => {
    findAll();
  }, []);

  return (
    <>
      {stateVideos.map((videos, index) => {
        return (
          <div key={categorias[index]}>
            <h2 className={`${styles.tituloCategoria} ${textColor[index]}`}>
              {categorias[index]}
            </h2>
            <Carousel
              videos={videos}
              backGroundColor={backGroundColor[index]}
            />
          </div>
        );
      })}
    </>
  );
};

export default Main;
