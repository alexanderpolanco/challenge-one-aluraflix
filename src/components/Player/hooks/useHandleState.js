import { useState, useEffect } from "react";
import IconReplay from "../IconReplay";
import IconMuteOn from "../IconMuteOn";
import IconMuteOff from "../IconMuteOff";

const useHandleState = (descriptionRef, playing, thumb) => {
  const widthViewport = window.innerWidth;
  const [state, setState] = useState({
    styleReactPlayer: {
      opacity: 0,
      transition: "opacity 1s",
    },
    styleDescription: {},
    styleTitulo: {},
    styleCategoria: {},
    styleButtonMute: { display: "none" },
    styleInfoVideo: {},
    playing,
    volume: {
      volume: 0,
      mute: true,
      iconActive: () => {},
    },
    height: "100vh",
    widthViewport,
  });

  const handleBufferEnd = (playing2 = undefined) => {
    const heightDescription =
      descriptionRef === undefined ? 0 : descriptionRef?.current?.offsetHeight;

    setState((state) => {
      let IconActive;
      if (playing2 !== undefined) {
        IconActive = state.volume.iconActive;
      } else {
        IconActive = state.volume.mute ? IconMuteOff : IconMuteOn;
      }
      const traslateX = parseInt(
        state.widthViewport * 0.965 - state.widthViewport
      );

      let stateStyles =
        state.widthViewport <= 720
          ? {}
          : {
              styleDescription: { opacity: 0 },
              styleTitulo: {
                transform: `translateY(${heightDescription}px) translateX(${traslateX}px) scale(0.8)`,
              },
              styleCategoria: {
                transform: `translateY(${heightDescription}px)`,
              },
            };

      const infoVideo = {
        border: "none",
        backgroundColor: "transparent",
      };

      stateStyles = { ...stateStyles, styleInfoVideo: infoVideo };

      const playing = playing2 === undefined ? state.playing : playing2;
      const styleButtonMute = thumb ? { display: "none" } : {};
      const volume = thumb
        ? { ...state.volume }
        : { ...state.volume, iconActive: IconActive };

      return {
        ...state,
        styleReactPlayer: { ...state.styleReactPlayer, opacity: 1 },
        ...stateStyles,
        playing,
        volume,
        styleButtonMute,
      };
    });
  };

  const handleEnded = () => {
    setState((state) => {
      const IconActive = IconReplay;
      let stateStyles =
        state.widthViewport <= 720
          ? {}
          : {
              styleDescription: { opacity: 1 },
              styleTitulo: {},
              styleCategoria: {},
            };

      stateStyles = { ...stateStyles, styleInfoVideo: {} };

      return {
        ...state,
        styleReactPlayer: { ...state.styleReactPlayer, opacity: 0 },
        ...stateStyles,
        playing: false,
        volume: {
          ...state.volume,
          iconActive: IconActive,
        },
      };
    });
  };

  const handleClickMute = () => {
    if (state.playing === false) {
      const playing = true;
      handleBufferEnd(playing);
    } else {
      setState((state) => {
        const stateVolume = state.volume.mute ? 1 : 0;

        const mute =
          state.styleReactPlayer.opacity === 0
            ? state.volume.mute
            : !state.volume.mute;
        const volume =
          state.styleReactPlayer.opacity === 0
            ? state.volume.volume
            : stateVolume;

        const IconActive = mute ? IconMuteOff : IconMuteOn;

        return {
          ...state,
          volume: {
            mute,
            volume,
            iconActive: IconActive,
          },
        };
      });
    }
  };

  useEffect(() => {
    if (thumb === false) {
      function handleViewportResize() {
        const widthViewport = window.innerWidth;
        const heightViewport = window.innerHeight;

        const widthViewportConditional =
          widthViewport <= 600 ? 600 : widthViewport;

        if (widthViewportConditional < 1410) {
          let height =
            heightViewport <= 430
              ? 100
              : parseInt((widthViewportConditional * 100) / 1650, 10);
          height = `${height}vh`;
          setState((state) => ({
            ...state,
            height,
            widthViewport,
          }));
        }
      }

      window.addEventListener("resize", handleViewportResize);
      handleViewportResize();
    }
  }, []);
  return [state, setState, handleClickMute, handleEnded, handleBufferEnd];
};

export default useHandleState;
