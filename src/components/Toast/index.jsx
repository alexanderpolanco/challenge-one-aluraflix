import styles from "./toast.module.css";

const Toast = (props) => {
  let { open = false } = props.state;
  let style = {};
  if (open === true) {
    style = { transform: "translateX(0px)" };
  }

  return (
    <div className={styles.toast} style={style}>
      {props.children}
    </div>
  );
};

export default Toast;
