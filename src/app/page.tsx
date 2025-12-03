import Hero from '@/components/home/Hero';
import styles from '@/styles/modules/page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
}