import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./carousel.module.css";
import Player from "../../../../../../components/Player";
import IconPlay from "./IconPlay";
import IconTrash from "./IconTrash";
import IconEdit from "./IconEdit";
import { MiContexto } from "../../../Context";

const Slide = ({ propsVideo, backGroundColor }) => {
  const [statePlaying, setStatePlaying] = useState(false);
  const { setState, deleteVideo } = useContext(MiContexto);

  const { urlImage, titulo, urlVideo, _ID } = propsVideo;

  const propsPlayer = {
    buttons: false,
    playing: statePlaying,
    thumb: true,
    backGroundColor,
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
  propsVideo.descripcion = null;
  propsVideo.categoria = null;

  const handleModal = () => {
    const obj = { open: true, _ID };
    setState(obj);
  };

  const handleDelete = () => {
    const filter = {
      _ID,
    };
    deleteVideo(filter);
  };

  return (
    <div
      key={propsVideo._ID}
      className={styles.emblaSlide}
      onMouseEnter={() => {
        setStatePlaying(true);
      }}
      onMouseLeave={() => {
        setStatePlaying(false);
      }}
    >
      <div className={styles.emblaSlideContent}>
        <Player {...propsVideo} {...propsPlayer} />
        <div className={styles.controlsSlide}>
          <button className={styles.buttonSlide} onClick={() => handleModal()}>
            <IconEdit />
            Editar
          </button>
          <button className={styles.buttonSlide} onClick={() => handleDelete()}>
            <IconTrash />
            Borrar
          </button>
          <Link to="/video" state={{ urlImage, titulo, urlVideo }}>
            <button className={styles.buttonSlide}>
              <IconPlay />
              Reproducir
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
