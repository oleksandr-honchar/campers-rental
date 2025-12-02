import React from 'react';
import styles from '@/styles/modules/Loader.module.css';

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bar';
  fullScreen?: boolean;
  text?: string;
  color?: 'primary' | 'secondary' | 'white';
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium',
  variant = 'spinner',
  fullScreen = false,
  text,
  color = 'primary',
}) => {
  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />;
      
      case 'dots':
        return (
          <div className={`${styles.dots} ${styles[size]}`}>
            <span className={styles[color]} />
            <span className={styles[color]} />
            <span className={styles[color]} />
          </div>
        );
      
      case 'pulse':
        return <div className={`${styles.pulse} ${styles[size]} ${styles[color]}`} />;
      
      case 'bar':
        return (
          <div className={`${styles.barContainer} ${styles[size]}`}>
            <div className={`${styles.bar} ${styles[color]}`} />
          </div>
        );
      
      default:
        return <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />;
    }
  };

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <div className={styles.content}>
          {renderLoader()}
          {text && <p className={styles.text}>{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {renderLoader()}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};