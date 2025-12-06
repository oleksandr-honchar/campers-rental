import Hero from '@/components/home/Hero';
import styles from '@/styles/modules/page.module.css';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: "Campers Rental - Home",
  description: "Find and rent the perfect camper for your next adventure.",
  keywords: "camper rental, motorhome, campervan, RV rental, travel, adventure",
  openGraph: {
    title: "Campers Rental - Home",
    description: "Find and rent the perfect camper for your next adventure.",
    url: "http://localhost:3000",
    siteName: "Campers Rental",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campers Rental - Home",
  },
});

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
}