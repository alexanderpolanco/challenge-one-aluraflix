import { useEffect, useRef, useState } from "react";
import { localBD } from "../../bd/localBD.js";
import useForm from "../../hooks/useForm.js";
import styles from "./addVideo.module.css";
import Toast from "../../components/Toast/index.jsx";

const AddVideo = () => {
  const bd = new localBD("aluraFlix");
  const form = useRef(null);
  const [stateToast, setStateToast] = useState({ open: false });

  useEffect(() => {
    const [$form, onSubmit] = useForm(form);

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      const state = onSubmit();
      if (state.statusForm === true) {
        const _ID = bd.execute("videos").insert({ ...state.dataForm });
        state.reset();
        setStateToast({ open: true });
      }
    });
  }, []);

  return (
    <div className={styles.pagAddVideo}>
      <h1 className={styles.titulo}>NUEVO VIDEO</h1>
      <span className={styles.comentario}>
        COMPLETE EL FORMULARIO PARA UNA NUEVA TARJETA DE VIDEO
      </span>
      <h3 className={styles.subTitulo}>Crear Tarjerta</h3>
      <form className={styles.formulario} ref={form}>
        <div className={styles.inputsForm}>
          <label className={styles.label}>
            <span>Título</span>
            <input
              type="text"
              name="titulo"
              placeholder="Título del video"
              pattern="^[a-zA-ZÀ-ÿ\s]+$"
              maxLength="40"
              title="Título"
              required
            />
          </label>
          <label className={styles.label}>
            <span>Categoria</span>
            <select name="categoria" required>
              <option value="Front End">Front End</option>
              <option value="Back End">Back End</option>
              <option value="Innovación y Gestión">Innovación y Gestión</option>
            </select>
          </label>
          <label className={styles.label}>
            <span>Imagen</span>
            <input
              type="url"
              name="urlImage"
              placeholder="Enlace de la imagen"
              title="Imagen"
              maxLength="400"
              required
            />
          </label>
          <label className={styles.label}>
            <span>Video</span>
            <input
              type="url"
              name="urlVideo"
              placeholder="Enlace del video"
              title="Video"
              maxLength="400"
              required
            />
          </label>
          <label className={styles.label}>
            <span>Descripción</span>
            <textarea
              rows={5}
              name="descripcion"
              placeholder="Descripción del video"
              title="Descripción"
              maxLength="200"
              required
            ></textarea>
          </label>
        </div>
        <div className={styles.buttonsForm}>
          <button
            className={`${styles.button} ${styles.buttonSubmit}`}
            type="submit"
          >
            GUARDAR
          </button>
          <button
            className={`${styles.button} ${styles.buttonLimpiar}`}
            type="reset"
          >
            LIMPIAR
          </button>
        </div>
      </form>
      <Toast state={stateToast}>Datos guardados con éxito.</Toast>
    </div>
  );
};

export default AddVideo;
