'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camper } from '@/types';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { formatPrice } from '@/utils/formatPrice';
import styles from '@/styles/modules/CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export function CamperCard({ camper }: CamperCardProps) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(camper.id);

  const handleShowMore = () => {
    router.push(`/catalog/${camper.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(camper.id);
  };

  const mainImage = camper.gallery?.[0]?.thumb || '/images/placeholder-camper.jpg';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={mainImage}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{camper.name}</h3>
            <div className={styles.priceGroup}>
              <span className={styles.price}>€{formatPrice(camper.price)}</span>
              <button
                onClick={handleToggleFavorite}
                className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                  <path
                    d="M13 21.888L11.36 20.3787C5.824 15.3947 2 11.92 2 7.68C2 4.20667 4.728 1.6 8.16 1.6C10.104 1.6 12.0267 2.56 13 4.05867C13.9733 2.56 15.896 1.6 17.84 1.6C21.272 1.6 24 4.20667 24 7.68C24 11.92 20.176 15.3947 14.64 20.3787L13 21.888Z"
                    fill={isFavorite ? '#E44848' : 'transparent'}
                    stroke="#101828"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.meta}>
            <div className={styles.rating}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.33334L10.06 5.50667L14.6667 6.18001L11.3333 9.42667L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42667L1.33334 6.18001L5.94 5.50667L8 1.33334Z"
                  fill="#FFC531"
                  stroke="#FFC531"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.ratingText}>
                {camper.rating} ({camper.reviews.length} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.33334C5.42267 1.33334 3.33334 3.42267 3.33334 6.00001C3.33334 9.50001 8 14.6667 8 14.6667C8 14.6667 12.6667 9.50001 12.6667 6.00001C12.6667 3.42267 10.5773 1.33334 8 1.33334ZM8 7.66668C7.08 7.66668 6.33334 6.92001 6.33334 6.00001C6.33334 5.08001 7.08 4.33334 8 4.33334C8.92 4.33334 9.66667 5.08001 9.66667 6.00001C9.66667 6.92001 8.92 7.66668 8 7.66668Z"
                  fill="#101828"
                />
              </svg>
              <span className={styles.locationText}>{camper.location}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.transmission && (
            <span className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5.83334H5V14.1667H7.5V5.83334Z" fill="#101828"/>
                <path d="M12.5 5.83334H15V14.1667H12.5V5.83334Z" fill="#101828"/>
              </svg>
              {camper.transmission}
            </span>
          )}
          {camper.engine && (
            <span className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.6667 10.8333H14.1667V13.3333H11.6667V10.8333H8.33333V13.3333H5.83333V10.8333H3.33333V8.33333H5.83333V5.83333H8.33333V8.33333H11.6667V5.83333H14.1667V8.33333H16.6667V10.8333Z" fill="#101828"/>
              </svg>
              {camper.engine}
            </span>
          )}
          {camper.AC && (
            <span className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5V7.5M10 12.5V15M5 10H7.5M12.5 10H15M6.46447 6.46447L8.23223 8.23223M11.7678 11.7678L13.5355 13.5355M6.46447 13.5355L8.23223 11.7678M11.7678 8.23223L13.5355 6.46447" stroke="#101828" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              AC
            </span>
          )}
          {camper.kitchen && (
            <span className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 3.33334V16.6667M5 3.33334H15V8.33334H5M5 3.33334H3.33333M5 16.6667H15V8.33334M5 16.6667H3.33333M15 8.33334H16.6667" stroke="#101828" strokeWidth="1.5"/>
              </svg>
              Kitchen
            </span>
          )}
          {camper.bathroom && (
            <span className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.33333 8.33334H16.6667M5.83333 5H14.1667V8.33334H5.83333V5Z" stroke="#101828" strokeWidth="1.5"/>
              </svg>
              Bathroom
            </span>
          )}
        </div>

        <button
          onClick={handleShowMore}
          className={styles.showMoreButton}
        >
          Show more
        </button>
      </div>
    </article>
  );
}