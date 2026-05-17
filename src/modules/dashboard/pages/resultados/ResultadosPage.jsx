import ResultadoComponent from '../../components/resultados-prueba/ResultadosPrueba';
import styles from './resultados.module.css';
import { useAppSelector } from '../../../../redux/store';


export default function ResultadosPage() {
  const { array_respuestas } = useAppSelector(
    (state) => state.cursoSlice
  );


  console.log(array_respuestas);
  

  return (
    <div className={styles.div_resultados}>
      <ResultadoComponent array_respuestas={array_respuestas} />
    </div>
  );
}
