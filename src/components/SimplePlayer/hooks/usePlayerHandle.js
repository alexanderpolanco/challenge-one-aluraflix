import { useState, useRef } from "react";

const usePlayerHandle = () => {
  const player = useRef(null);

  const [stateControls, setStateControls] = useState({
    transform: {
      backgroundControlsUp: "",
      backgroundControlsDown: "",
    },
  });

  const [state, setState] = useState({
    url: "",
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    bufferEnd: false,
    transform: {
      backgroundControlsUp: "",
      backgroundControlsDown: "",
    },
  });

  const load = (url) => {
    setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  let timer;

  let opacityPlayer = {
    opacity: 1,
  };

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };
  /*
  const handleStop = () => {
    setState({ ...state, url: null, playing: false });
  };

  const handleToggleControls = () => {
    const url = state.url;
    setState(
      {
        controls: !state.controls,
        url: null,
      },
      () => load(url)
    );
  };

  const handleToggleLight = () => {
    setState({ ...state, light: !state.light });
  };

  const handleToggleLoop = () => {
    setState({ ...state, loop: !state.loop });
  };
*/
  const handleVolumeChange = (e) => {
    setState({ ...state, volume: parseFloat(e.target.value) });
  };

  const handleToggleMuted = () => {
    setState({ ...state, muted: !state.muted });
  };
  /*
  const handleSetPlaybackRate = (e) => {
    setState({ ...state, playbackRate: parseFloat(e.target.value) });
  };
*/
  const handleOnPlaybackRateChange = (speed) => {
    setState({ ...state, playbackRate: parseFloat(speed) });
  };
  /*
  const handleTogglePIP = () => {
    setState({ ...state, pip: !state.pip });
  };
*/
  const handlePlay = () => {
    setState({ ...state, playing: true });
  };

  const handleEnablePIP = () => {
    setState({ ...state, pip: true });
  };

  const handleDisablePIP = () => {
    setState({ ...state, pip: false });
  };

  const handlePause = () => {
    setState({ ...state, playing: false });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekChange = (e) => {
    setState({ ...state, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setState({ ...state, seeking: false });
    player.current?.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (progress) => {
    if (!state.seeking) {
      setState({ ...state, ...progress });
    }
  };

  const handleEnded = () => {
    setState({ ...state, playing: state.loop });
  };

  const handleBufferEnd = () => {
    setState({ ...state, bufferEnd: true });
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const eventoDespuesDeInactividad = (event) => {
    if (event !== undefined) {
      event.target.style.cursor = "none";
    }
    setStateControls((stateControls) => {
      return {
        ...stateControls,
        transform: {
          backgroundControlsUp: "translateY(-80px)",
          backgroundControlsDown: "translateY(80px)",
        },
      };
    });
  };

  const action = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => eventoDespuesDeInactividad(event), 5000);

    if (
      stateControls.transform.backgroundControlsDown === "translateY(80px)" ||
      stateControls.transform.backgroundControlsDown === ""
    ) {
      if (event !== undefined) {
        event.target.style.cursor = "auto";
      }
      setStateControls((stateControls) => {
        return {
          ...stateControls,
          transform: {
            backgroundControlsUp: "translate(0)",
            backgroundControlsDown: "translate(0)",
          },
        };
      });
    }
  };

  const mouseLeave = (event) => {
    clearTimeout(timer);
    eventoDespuesDeInactividad(event);
    event.target.style.cursor = "auto";
  };

  const mouseHover = (event) => {
    document.addEventListener("mousemove", function () {
      action(event);
    });
  };

  if (!state.playing || !state.bufferEnd) {
    opacityPlayer = {
      opacity: 0,
    };
  }

  return [
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
  ];
};

export default usePlayerHandle;
