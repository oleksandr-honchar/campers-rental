'use client';

import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import styles from '@/styles/modules/TestLoaders.module.css';

export default function TestLoadersPage() {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Loader Components</h1>

      {/* Variants */}
      <section className={styles.section}>
        <h2>Variants</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Spinner</h3>
            <Loader variant="spinner" />
          </div>
          <div className={styles.card}>
            <h3>Dots</h3>
            <Loader variant="dots" />
          </div>
          <div className={styles.card}>
            <h3>Pulse</h3>
            <Loader variant="pulse" />
          </div>
          <div className={styles.card}>
            <h3>Bar</h3>
            <Loader variant="bar" />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className={styles.section}>
        <h2>Sizes</h2>
        <div className={styles.row}>
          <div className={styles.card}>
            <h3>Small</h3>
            <Loader size="small" />
          </div>
          <div className={styles.card}>
            <h3>Medium</h3>
            <Loader size="medium" />
          </div>
          <div className={styles.card}>
            <h3>Large</h3>
            <Loader size="large" />
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className={styles.section}>
        <h2>Colors</h2>
        <div className={styles.row}>
          <div className={styles.card}>
            <h3>Primary</h3>
            <Loader color="primary" />
          </div>
          <div className={styles.card}>
            <h3>Secondary</h3>
            <Loader color="secondary" />
          </div>
          <div className={styles.cardDark}>
            <h3>White</h3>
            <Loader color="white" />
          </div>
        </div>
      </section>

      {/* With Text */}
      <section className={styles.section}>
        <h2>With Text</h2>
        <div className={styles.row}>
          <div className={styles.card}>
            <Loader variant="spinner" text="Loading..." />
          </div>
          <div className={styles.card}>
            <Loader variant="dots" text="Please wait..." />
          </div>
          <div className={styles.card}>
            <Loader variant="pulse" text="Processing..." />
          </div>
        </div>
      </section>

      {/* Full Screen */}
      <section className={styles.section}>
        <h2>Full Screen Loader</h2>
        <Button onClick={() => setShowFullScreen(true)}>
          Show Full Screen Loader
        </Button>
        
        {showFullScreen && (
          <Loader 
            variant="spinner" 
            fullScreen 
            text="Loading your content..."
          />
        )}
        
        {showFullScreen && (
          <Button 
            variant="secondary" 
            onClick={() => setShowFullScreen(false)}
            style={{ marginTop: '16px' }}
          >
            Hide Loader
          </Button>
        )}
      </section>

      {/* Real World Examples */}
      <section className={styles.section}>
        <h2>Real World Examples</h2>
        
        <div className={styles.examples}>
          <div className={styles.example}>
            <h3>Loading Page Content</h3>
            <div className={styles.exampleContent}>
              <Loader variant="spinner" size="large" text="Loading campers..." />
            </div>
          </div>

          <div className={styles.example}>
            <h3>Loading More Items</h3>
            <div className={styles.exampleContent}>
              <Loader variant="dots" text="Loading more..." />
            </div>
          </div>

          <div className={styles.example}>
            <h3>Processing Form</h3>
            <div className={styles.exampleContent}>
              <Loader variant="pulse" text="Submitting booking..." />
            </div>
          </div>

          <div className={styles.example}>
            <h3>Progress Bar</h3>
            <div className={styles.exampleContent}>
              <Loader variant="bar" size="large" text="Uploading images..." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}