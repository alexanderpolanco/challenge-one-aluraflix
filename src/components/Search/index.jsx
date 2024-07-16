import { useState } from "react";
import styles from "./search.module.css";

export default function Search() {
  const [activo, setActivo] = useState(false);

  const Svg = ({ style = styles.iconLupa }) => (
    <svg
      onClick={() => {
        setActivo(!activo);
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );

  const Input = () => (
    <div className={styles.inputWraper}>
      <Svg style={styles.inputIcon} />
      <input
        type="text"
        name="name"
        placeholder="Título del video"
        title="Nombre"
        pattern="^[a-zA-ZÀ-ÿ\s]+$"
        className={styles.input}
        maxLength="19"
      />
    </div>
  );

  return activo === false ? <Svg /> : <Input />;
}
