import { ReactNode } from 'react';
import styles from '@/styles/modules/Container.module.css';

interface ContainerProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}

export const Container = ({ 
  children, 
  size = 'large',
  className = '' 
}: ContainerProps) => {
  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      {children}
    </div>
  );
};