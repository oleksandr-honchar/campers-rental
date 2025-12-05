'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCamperById } from '@/services/campers';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { Camper } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import CamperFeatures from '@/components/CamperFeatures';
import CamperReviews from '@/components/CamperReviews';
import styles from '@/styles/modules/CamperDetails.module.css';
import { StarIcon, LocationIcon } from '@/components/ui/icons';

export default function CamperDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  const { favorites, toggleFavorite } = useFavoritesStore();
  const camperId = params.id as string;
  const isFavorite = camperId ? favorites.includes(camperId) : false;

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCamperById(params.id as string);
        setCamper(data);
      } catch (err) {
        console.error('Error fetching camper:', err);
        setError('Failed to load camper details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCamper();
    }
  }, [params.id]);

  // Обробка форми бронювання
  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Booking successful! We will contact you soon.');
    e.currentTarget.reset();
  };

  // Форматування локації
  const formatLocation = (location: string) => {
    const parts = location.split(', ');
    return parts.length >= 2 ? `${parts[1]}, ${parts[0]}` : location;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  if (error || !camper) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1 className={styles.errorTitle}>Camper not found</h1>
          <p className={styles.errorMessage}>
            {error || 'The camper you are looking for does not exist.'}
          </p>
          <button 
            onClick={() => router.push(ROUTES.CATALOG)}
            className={styles.backButton}
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header з назвою, рейтингом, локацією та ціною */}
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        
<div className={styles.ratingLocation}>
  <div className={styles.rating} onClick={() => setActiveTab('reviews')}>
    <StarIcon className={styles.starIcon} />
    <span>
      {camper.rating} ({camper.reviews.length}{' '}
      {camper.reviews.length === 1 ? 'Review' : 'Reviews'})
    </span>
  </div>
  
  <div className={styles.location}>
    <LocationIcon className={styles.locationIcon} />
    <span>{formatLocation(camper.location)}</span>
  </div>
</div>

        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>

      {/* Галерея фотографій (перші 4 зображення) */}
      <div className={styles.gallery}>
        {camper.gallery.slice(0, 4).map((image, index) => (
          <Image
            key={index}
            src={image.original}
            alt={`${camper.name} - ${index + 1}`}
            width={292}
            height={312}
            className={styles.galleryImage}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Опис */}
      <p className={styles.description}>{camper.description}</p>

      {/* Tabs - виносимо за межі content */}
      <div className={styles.tabs}>
        <div className={styles.tabList}>
          <div
            className={`${styles.tab} ${activeTab === 'features' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </div>
        </div>
      </div>

      {/* Основний контент: Features/Reviews + Форма бронювання */}
      <div className={styles.content}>
        {/* Ліва частина: Tab Content */}
        <div>
          {activeTab === 'features' ? (
            <CamperFeatures camper={camper} />
          ) : (
            <CamperReviews reviews={camper.reviews} />
          )}
        </div>

        {/* Права частина: Форма бронювання */}
        <div className={styles.bookingForm}>
          <h3 className={styles.formTitle}>Book your campervan now</h3>
          <p className={styles.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <form onSubmit={handleBookingSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              required
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              className={styles.input}
            />
            <input
              type="date"
              name="bookingDate"
              placeholder="Booking date*"
              required
              className={styles.input}
            />
            <textarea
              name="comment"
              placeholder="Comment"
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>
        </div>
            </div>
    </div>

  );
}