import styles from "./lista_img.module.css";

const ListaImg = [
  { text: "React", img: "/images/home/lista_img/mac.jpg" },
  { text: "Electron js", img: "/images/home/lista_img/win12.jpeg" },
  { text: "Golang", img: "/images/home/lista_img/mac.jpg" },
  { text: "Postgress", img: "/images/home/lista_img/win12.jpeg" },
];

export default function ListImages() {
  return (
    <div className={styles.layout}>
      <article className={styles.content_img}>
        {ListaImg?.map((e, index) => {
          return (
            <div key={index} className={styles.div_img}>
              <img className={styles.item_img} src={e.img} alt={e.text} width={500} height={500} />
              <span className={styles.item_text}> {e.text} </span>
            </div>
          );
        })}
      </article>
    </div>
  );
}
