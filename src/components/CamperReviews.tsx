import React from 'react';
import { CamperReview } from '@/types';
import { StarIcon } from '@/components/ui/icons';
import styles from '@/styles/modules/CamperDetails.module.css';

interface CamperReviewsProps {
  reviews: CamperReview[];
}

const CamperReviews: React.FC<CamperReviewsProps> = ({ reviews }) => {
  // Функція для генерації зірок
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`${styles.reviewStar} ${index < rating ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  // Функція для отримання першої літери імені
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.reviews}>
        <p className={styles.noReviews}>No reviews yet</p>
      </div>
    );
  }

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