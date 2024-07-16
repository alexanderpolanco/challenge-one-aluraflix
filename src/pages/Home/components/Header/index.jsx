import { useState, useEffect } from "react";
import { localBD } from "../../../../../src/bd/localBD.js";
import Player from "../../../../components/Player";
import styles from "../../../../main.module.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Header = () => {
  const [state, setState] = useState({});

  const backGroundColor = {
    ["Front End"]: styles.frontEndColor,
    ["Back End"]: styles.backEndColor,
    ["Innovación y Gestión"]: styles.gestionColor,
  };

  useEffect(() => {
    async function findAll() {
      const bd = new localBD("aluraFlix");

      let videos = await bd.execute("videos").find();

      const index = getRandomInt(videos.length);

      const props = {
        urlImage: videos[index].urlImage,
        urlVideo: videos[index].urlVideo,
        categoria: videos[index].categoria,
        titulo: videos[index].titulo,
        descripcion: videos[index].descripcion,
        backGroundColor: backGroundColor[videos[index].categoria],
        playing: true,
        configYoutube: {
          youtube: {
            playerVars: {
              end: 20,
              disablekb: 1,
              fs: 0,
              rel: 0,
              modestbranding: 1,
            },
          },
        },
      };

      setState(props);
    }

    findAll();
  }, []);

  return <Player {...state} />;
};

export default Header;
