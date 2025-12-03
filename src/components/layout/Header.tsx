'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { ROUTES } from '@/constants/routes';
import styles from '@/styles/modules/Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            <Image
              src="/images/logo.svg"
              alt="Campers Rental"
              width={136}
              height={16}
              priority
            />
          </Link>

          <ul className={styles.navList}>
            <li>
              <Link
                href={ROUTES.HOME}
                className={`${styles.navLink} ${pathname === ROUTES.HOME ? styles.active : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.CATALOG}
                className={`${styles.navLink} ${pathname.startsWith(ROUTES.CATALOG) ? styles.active : ''}`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
