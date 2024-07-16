import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import styles from "./player.module.css";
import IconPlay from "./IconPlay";
import IconInfo from "./IconInfo";
import useHandleState from "./hooks/useHandleState";

const Player = (props) => {
  const {
    urlImage,
    categoria,
    titulo,
    descripcion,
    urlVideo,
    configYoutube,
    backGroundColor = styles.trasparentColor,
    buttons = true,
    playing = false,
    thumb = false,
  } = props;
  const descriptionRef = useRef(null);

  const [state, setState, handleClickMute, handleEnded, handleBufferEnd] =
    useHandleState(descriptionRef, playing, thumb);

  let height = state.height;
  let infoVideo = `${styles.infoVideo} ${backGroundColor}`;
  let overVideo = styles.overVideo;
  let styleTitulo = state.styleTitulo;
  let backgroundColorTitulo = {};

  if (thumb) {
    height = "200px";
    infoVideo = `${styles.infoVideoThumb}`;
    overVideo = `${overVideo} ${styles.overVideoThumb}`;
    backgroundColorTitulo = backGroundColor;
  }

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        playing,
        styleReactPlayer: { ...state.styleReactPlayer, opacity: 0 },
      };
    });
  }, [playing]);

  return (
    <div
      className={styles.player}
      style={{ backgroundImage: `url(${urlImage})` }}
    >
      <div className={overVideo} style={{ height: height }}>
        <div className={infoVideo} style={state.styleInfoVideo}>
          {categoria && <h2 style={state.styleCategoria}>{categoria}</h2>}
          {titulo && (
            <h1 style={styleTitulo} className={backgroundColorTitulo}>
              {titulo}
            </h1>
          )}
          {descripcion && (
            <p style={state.styleDescription} ref={descriptionRef}>
              {descripcion}
            </p>
          )}
        </div>
        <div className={styles.playerButtons}>
          {buttons && (
            <div className={styles.buttons}>
              <Link to="/video" state={{ urlImage, titulo, urlVideo }}>
                <button className={`${styles.button} ${styles.buttonPlay}`}>
                  <IconPlay /> Reproducir
                </button>
              </Link>
            </div>
          )}
          <div
            className={styles.containerVolume}
            style={state.styleButtonMute}
            onClick={() => {
              handleClickMute();
            }}
          >
            {state.volume.iconActive()}
          </div>
        </div>
      </div>
      <ReactPlayer
        style={state.styleReactPlayer}
        url={urlVideo}
        width="100%"
        height={height}
        volume={state.volume.volume}
        muted={state.volume.mute}
        onEnded={() => handleEnded()}
        onBufferEnd={() => handleBufferEnd()}
        playing={state.playing}
        config={configYoutube}
      />
    </div>
  );
};

export default Player;
