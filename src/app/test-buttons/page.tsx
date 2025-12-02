'use client';

import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import styles from '@/styles/modules/TestButtons.module.css';

export default function TestButtonsPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={styles.container}>
      <h1>Button Components</h1>

      {/* Variants */}
      <section className={styles.section}>
        <h2>Variants</h2>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className={styles.section}>
        <h2>Sizes</h2>
        <div className={styles.row}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section className={styles.section}>
        <h2>With Icons</h2>
        <div className={styles.row}>
          <Button icon="🚐" iconPosition="left">
            View Campers
          </Button>
          <Button variant="outline" icon="❤️" iconPosition="right">
            Add to Favorites
          </Button>
          <Button variant="secondary" icon="📍">
            Location
          </Button>
        </div>
      </section>

      {/* States */}
      <section className={styles.section}>
        <h2>States</h2>
        <div className={styles.row}>
          <Button loading={loading} onClick={handleClick}>
            {loading ? 'Loading...' : 'Click to Load'}
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Full Width */}
      <section className={styles.section}>
        <h2>Full Width</h2>
        <Button fullWidth>Full Width Button</Button>
      </section>

      {/* Combined Examples */}
      <section className={styles.section}>
        <h2>Real World Examples</h2>
        <div className={styles.examples}>
          <div className={styles.example}>
            <h3>Primary Action</h3>
            <Button variant="primary" size="large" icon="🔍">
              Search Campers
            </Button>
          </div>

          <div className={styles.example}>
            <h3>Form Submit</h3>
            <Button variant="primary" fullWidth>
              Submit Booking
            </Button>
          </div>

          <div className={styles.example}>
            <h3>Secondary Action</h3>
            <Button variant="outline" icon="↻">
              Reset Filters
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}