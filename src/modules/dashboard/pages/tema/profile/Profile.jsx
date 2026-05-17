import styles from "./profile.module.css";

const ProfileCard = () => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.quizNavTitle}>
        <span>Navegación de preguntas</span>
      </div>
    </div>
  );
};

export default ProfileCard;
