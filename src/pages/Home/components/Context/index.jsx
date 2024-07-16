import { createContext, useState } from "react";
import { localBD } from "../../../../bd/localBD.js";

const MiContexto = createContext();

const MiProveedor = ({ children }) => {
  const [state, setState] = useState({ open: false, _ID: null });
  const [stateVideos, setStateVideos] = useState([]);

  async function findAll() {
    const bd = new localBD("aluraFlix");
    let allVideos = [];

    let filter = {
      categoria: "Front End",
    };
    let videosFront = await bd.execute("videos").find(filter);

    filter = {
      categoria: "Back End",
    };

    let videosBackend = await bd.execute("videos").find(filter);

    filter = {
      categoria: "Innovación y Gestión",
    };

    let videosGestion = await bd.execute("videos").find(filter);

    allVideos = [videosFront, videosBackend, videosGestion];

    setStateVideos(allVideos);
  }

  const deleteVideo = (filter) => {
    const bd = new localBD("aluraFlix");
    bd.execute("videos").delete(filter);
    findAll();
  };

  return (
    <MiContexto.Provider
      value={{
        state,
        setState,
        stateVideos,
        setStateVideos,
        findAll,
        deleteVideo,
      }}
    >
      {children}
    </MiContexto.Provider>
  );
};

export { MiContexto, MiProveedor };
