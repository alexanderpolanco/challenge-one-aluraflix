import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import styles from "./simplePlayer.module.css";
import IconPlay from "../Player/IconPlay";
import IconMuteOn from "../Player/IconMuteOn";
import IconMuteOff from "../Player/IconMuteOff";
import IconPause from "../Player/IconPause";
import IconArrowBack from "../Player/IconArrowBack";
import IconFullScreen from "../Player/IconFullScreen";
import IconFullScreenExit from "../Player/IconFullScreenExit";
import Duration from "../Player/Duration";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import usePlayerHandle from "./hooks/usePlayerHandle";

const SimplePlayer = () => {
  const { state: props } = useLocation();
  const handleClickFullscreen = useFullScreenHandle();

  const [
    state,
    stateControls,
    mouseHover,
    action,
    mouseLeave,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    handlePlayPause,
    handleToggleMuted,
    handleVolumeChange,
    player,
    opacityPlayer,
    handlePlay,
    handleEnablePIP,
    handleDisablePIP,
    handlePause,
    handleOnPlaybackRateChange,
    handleEnded,
    handleBufferEnd,
    handleProgress,
    handleDuration,
  ] = usePlayerHandle();

  const fullScreenBackgroundStyle = {
    backgroundImage: `url(${props.urlImage})`,
  };

  useEffect(() => {
    action();
  }, []);

  return (
    <FullScreen
      handle={handleClickFullscreen}
      className={`${styles.fullScreen}`}
    >
      <div className={styles.fullScreen} style={fullScreenBackgroundStyle}>
        <div
          className={styles.overVideo}
          onMouseEnter={(event) => {
            mouseHover(event);
          }}
          onClick={(event) => {
            action(event);
          }}
          onMouseLeave={(event) => {
            mouseLeave(event);
          }}
        >
          <div
            className={`${styles.containerControls} ${styles.backgroundControlsUp}`}
            style={{ transform: stateControls.transform.backgroundControlsUp }}
          >
            <Link to="/" className={styles.cursorPointer}>
              <IconArrowBack className={styles.iconArrowBack} />
            </Link>
            <h1 className={styles.tituloVideo}>{props.titulo}</h1>
          </div>
          <div
            className={`${styles.containerControls} ${styles.backgroundControlsDown}`}
            style={{
              transform: stateControls.transform.backgroundControlsDown,
            }}
          >
            <div>
              <input
                className={styles.progresBar}
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={state.played}
                onMouseDown={(e) => handleSeekMouseDown(e)}
                onChange={(e) => handleSeekChange(e)}
                onMouseUp={(e) => handleSeekMouseUp(e)}
              />
            </div>
            <div className={styles.controls}>
              <div>
                <div>
                  <div
                    className={styles.iconButtonsControls}
                    onClick={() => handlePlayPause()}
                  >
                    {state.playing ? <IconPause /> : <IconPlay />}
                  </div>
                  <div
                    className={`${styles.controlsMarginLeft} ${styles.iconButtonsControls}`}
                    onClick={() => handleToggleMuted()}
                  >
                    {state.muted ? <IconMuteOn /> : <IconMuteOff />}
                  </div>
                  <div className={styles.containerVolume}>
                    <input
                      className={styles.controlsMarginLeft}
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={state.volume}
                      onChange={(e) => handleVolumeChange(e)}
                    />
                  </div>
                  <div className={styles.controlsMarginLeft}>
                    <Duration seconds={state.duration * state.played} />
                    <div style={{ margin: "0px 5px" }}>/</div>
                    <Duration seconds={state.duration} />
                  </div>
                </div>
              </div>
              <div
                className={`${styles.iconButtonsControls} ${styles.iconFullscreen}`}
              >
                {handleClickFullscreen.active ? (
                  <IconFullScreenExit onClick={handleClickFullscreen.exit} />
                ) : (
                  <IconFullScreen onClick={handleClickFullscreen.enter} />
                )}
              </div>
            </div>
          </div>
        </div>
        <ReactPlayer
          className={styles.player}
          style={opacityPlayer}
          ref={player}
          url={props.urlVideo}
          width="100%"
          height="99.5vh"
          pip={state.pip}
          playing={state.playing}
          controls={state.controls}
          light={state.light}
          loop={state.loop}
          playbackRate={state.playbackRate}
          volume={state.volume}
          muted={state.muted}
          config={{
            youtube: {
              playerVars: {
                disablekb: 1,
                fs: 0,
                rel: 0,
                modestbranding: 1,
              },
            },
          }}
          onPlay={() => handlePlay()}
          onEnablePIP={() => handleEnablePIP()}
          onDisablePIP={() => handleDisablePIP()}
          onPause={() => handlePause()}
          onPlaybackRateChange={() => handleOnPlaybackRateChange()}
          onEnded={() => handleEnded()}
          onBufferEnd={() => handleBufferEnd()}
          onProgress={(progress) => handleProgress(progress)}
          onDuration={(duration) => handleDuration(duration)}
        />
      </div>
    </FullScreen>
  );
};

export default SimplePlayer;
