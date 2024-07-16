import { useEffect, useRef, useContext, useState } from "react";
import { localBD } from "../../bd/localBD.js";
import useForm from "../../hooks/useForm";
import styles from "./modal.module.css";
import { MiContexto } from "../../pages/Home/components/Context";
import Toast from "../Toast/index.jsx";

const Modal = () => {
  const bd = new localBD("aluraFlix");
  const form = useRef(null);
  const { state, setState, findAll } = useContext(MiContexto);
  const [stateToast, setStateToast] = useState({ open: false });

  const _ID = state._ID;
  const filter = {
    _ID,
  };

  const fillInput = async () => {
    const [$form, onSubmit, $inputElements] = useForm(form);

    const video = await bd.execute("videos").find(filter);

    $inputElements.forEach((element) => {
      element.value = video[0][element.name];
    });
  };

  const handleClose = () => {
    const [$form, onSubmit] = useForm(form);
    const stateForm = onSubmit();
    stateForm.reset();
    setStateToast({ open: false });
    setState({ open: false, _ID: null });
  };

  useEffect(() => {
    const [$form, onSubmit] = useForm(form);

    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      const stateForm = onSubmit();
      if (stateForm.statusForm === true && _ID !== null) {
        const data = stateForm.dataForm;
        bd.execute("videos").update(filter, { _ID, ...data });

        findAll();
        stateForm.reset();
        setStateToast({ open: true });
      }
    });
    if (state.open) {
      fillInput();
    }
  }, [state]);

  return (
    <dialog open={state.open} className={styles.dialog}>
      <form className={styles.formulario} ref={form}>
        <div className={styles.containerTitulo}>
          <h1 className={styles.titulo}>EDITAR CARD</h1>
          <span className={styles.buttonClose} onClick={() => handleClose()}>
            X
          </span>
        </div>
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
      <Toast state={stateToast}>Datos actualizados con éxito.</Toast>
    </dialog>
  );
};

export default Modal;
