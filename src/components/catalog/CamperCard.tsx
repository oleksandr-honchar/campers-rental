'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camper } from '@/types';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { formatPrice } from '@/utils/formatPrice';
import { Icon, StarIcon, LocationIcon } from '@/components/ui/icons';
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

  // Масив features для відображення (перші 4-5)
  const displayFeatures = [
    { condition: camper.transmission, icon: 'automatic', label: camper.transmission },
    { condition: camper.engine, icon: 'petrol', label: camper.engine },
    { condition: camper.AC, icon: 'ac', label: 'AC' },
    { condition: camper.kitchen, icon: 'kitchen', label: 'Kitchen' },
    { condition: camper.bathroom, icon: 'bathroom', label: 'Bathroom' },
  ].filter(f => f.condition).slice(0, 5);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={mainImage}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
          priority={false}
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
              <StarIcon className={styles.ratingIcon} />
              <span className={styles.ratingText}>
                {camper.rating} ({camper.reviews.length} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <LocationIcon className={styles.locationIcon} />
              <span className={styles.locationText}>{camper.location}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {displayFeatures.map((feature, index) => (
            <span key={index} className={styles.feature}>
              <Icon name={feature.icon} width={20} height={20} className={styles.featureIcon} />
              {feature.label}
            </span>
          ))}
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