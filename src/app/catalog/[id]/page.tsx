'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCamperById } from '@/services/campers';
import { Camper } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import styles from '@/styles/modules/CamperDetails.module.css';

export default function CamperDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

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

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (error || !camper) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Camper not found</h1>
          <p>{error || 'The camper you are looking for does not exist.'}</p>
          <Button onClick={() => router.push(ROUTES.CATALOG)}>
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button 
        variant="outline" 
        onClick={() => router.push(ROUTES.CATALOG)}
        className={styles.backButton}
      >
        ← Back to Catalog
      </Button>

      <div className={styles.header}>
        <h1>{camper.name}</h1>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {camper.rating}</span>
          <span className={styles.location}>📍 {camper.location}</span>
        </div>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>
      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (
          <Image 
            key={index} 
            src={image.original} 
            alt={`${camper.name} - ${index + 1}`}
            className={styles.galleryImage}
            width={800}
            height={600}
          />
        ))}
      </div>

      <div className={styles.description}>
        <p>{camper.description}</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'features' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={activeTab === 'reviews' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'features' ? (
          <div className={styles.features}>
            <div className={styles.featuresSection}>
              <h3>Vehicle Equipment</h3>
              <ul>
                <li>Transmission: {camper.transmission}</li>
                <li>Engine: {camper.engine}</li>
                {camper.AC && <li>✓ AC</li>}
                {camper.bathroom && <li>✓ Bathroom</li>}
                {camper.kitchen && <li>✓ Kitchen</li>}
                {camper.TV && <li>✓ TV</li>}
                {camper.radio && <li>✓ Radio</li>}
                {camper.refrigerator && <li>✓ Refrigerator</li>}
                {camper.microwave && <li>✓ Microwave</li>}
                {camper.gas && <li>✓ Gas</li>}
                {camper.water && <li>✓ Water</li>}
              </ul>
            </div>
            
            <div className={styles.featuresSection}>
              <h3>Vehicle Details</h3>
              <ul>
                <li>Form: {camper.form}</li>
                <li>Length: {camper.length}</li>
                <li>Width: {camper.width}</li>
                <li>Height: {camper.height}</li>
                <li>Tank: {camper.tank}</li>
                <li>Consumption: {camper.consumption}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.reviews}>
            {camper.reviews.length > 0 ? (
              camper.reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewerName}>{review.reviewer_name}</span>
                    <span className={styles.reviewRating}>
                      {'⭐'.repeat(review.reviewer_rating)}
                    </span>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}