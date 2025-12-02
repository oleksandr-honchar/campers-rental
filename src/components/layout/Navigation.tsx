'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import styles from '@/styles/modules/Navigation.module.css';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          🚐 Campers Rental
        </Link>
        
        <ul className={styles.menu}>
          <li>
            <Link 
              href={ROUTES.HOME}
              className={pathname === ROUTES.HOME ? styles.active : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href={ROUTES.CATALOG}
              className={pathname.startsWith(ROUTES.CATALOG) ? styles.active : ''}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};