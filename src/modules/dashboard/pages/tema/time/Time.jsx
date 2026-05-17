import { useEffect } from "react";
import styles from "./time.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTimePreguntas } from "../../../../../redux/slices/estateSlice";

const Timer = () => {
  const { time_preguntas } = useSelector((state) => state.stateSlice);

  const time = time_preguntas;

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const prev = time_preguntas;
      const s = prev.seconds < 59 ? prev.seconds + 1 : 0;
      const m =
        prev.seconds < 59
          ? prev.minutes
          : prev.minutes < 59
            ? prev.minutes + 1
            : 0;
      const h =
        prev.seconds < 59 || prev.minutes < 59
          ? prev.hours
          : prev.hours < 59
            ? prev.hours + 1
            : 0;

      dispatch(setTimePreguntas({ hours: h, minutes: m, seconds: s }));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, time_preguntas]);



  const fmt = (n) => n?.toString().padStart(2, "0");

  return (
    <div className={styles.timer}>
      <div className={styles.digit}>{fmt(time?.hours)}</div>
      <div className={styles.separator}>:</div>
      <div className={styles.digit}>{fmt(time?.minutes)}</div>
      <div className={styles.separator}>:</div>
      <div className={styles.digit}>{fmt(time?.seconds)}</div>
    </div>
  );
};

export default Timer;
