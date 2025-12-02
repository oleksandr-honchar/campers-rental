import { ReactNode } from 'react';
import styles from '@/styles/modules/Section.module.css';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Section = ({ 
  children, 
  className = '',
  background = 'white',
  padding = 'medium'
}: SectionProps) => {
  return (
    <section 
      className={`${styles.section} ${styles[background]} ${styles[`padding-${padding}`]} ${className}`}
    >
      {children}
    </section>
  );
};