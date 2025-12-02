'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import styles from '@/styles/modules/Header.module.css';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          <span className={styles.logoIcon}>🚐</span>
          <span className={styles.logoText}>Campers Rental</span>
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>
              <Link 
                href={ROUTES.HOME}
                className={pathname === ROUTES.HOME ? styles.active : styles.link}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href={ROUTES.CATALOG}
                className={pathname.startsWith(ROUTES.CATALOG) ? styles.active : styles.link}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};