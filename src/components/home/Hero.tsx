'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import styles from './Hero.module.css';

export default function Hero() {
  const router = useRouter();

  const handleViewCatalog = () => {
    router.push('/catalog');
  };

  return (
    <Section className={styles.heroSection}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Campers of your dreams
            </h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={handleViewCatalog}
              className={styles.ctaButton}
            >
              View Now
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
