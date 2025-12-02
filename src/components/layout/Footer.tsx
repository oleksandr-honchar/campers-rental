import Link from 'next/link';
import styles from '@/styles/modules/Footer.module.css';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.title}>🚐 Campers Rental</h3>
                        <p className={styles.description}>
                            Find and rent the perfect camper for your next adventure.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <ul className={styles.links}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/catalog">Catalog</Link></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Contact</h4>
                        <ul className={styles.contacts}>
                            <li>📧 info@campers-rental.com</li>
                            <li>📞 +380 (12) 345-67-89</li>
                            <li>📍 Kyiv, Ukraine</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {currentYear} Campers Rental. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};