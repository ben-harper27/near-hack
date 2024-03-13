import styles from "@/styles/app.module.css";
import PayButton from "@/components/PayButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <PayButton />
    </main>
  );
}
