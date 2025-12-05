import React from 'react';
import { CamperReview } from '@/types/camper';
import styles from '@/styles/modules/CamperDetails.module.css';

interface CamperReviewsProps {
  reviews: CamperReview[];
}

const CamperReviews: React.FC<CamperReviewsProps> = ({ reviews }) => {
  // Функція для генерації зірок
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`${styles.reviewStar} ${index < rating ? styles.starFilled : styles.starEmpty}`}
      >
        <use href="/sprite.svg#star" />
      </svg>
    ));
  };

  // Функція для отримання першої літери імені
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerAvatar}>
                {getInitial(review.reviewer_name)}
              </div>
              <div className={styles.reviewerInfo}>
                <p className={styles.reviewerName}>{review.reviewer_name}</p>
                <div className={styles.reviewStars}>
                  {renderStars(review.reviewer_rating)}
                </div>
              </div>
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamperReviews;