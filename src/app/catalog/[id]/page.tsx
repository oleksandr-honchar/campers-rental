'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCamperById } from '@/services/campers';
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

  // Booking form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

    if (params.id) fetchCamper();
  }, [params.id]);

  const formatLocation = (location: string) => {
    const parts = location.split(', ');
    return parts.length >= 2 ? `${parts[1]}, ${parts[0]}` : location;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!bookingDate) {
      toast.error('Please select a booking date.');
      return;
    }

    if (!bookingDate || bookingDate.getTime() < new Date().setHours(0, 0, 0, 0)) {
      toast.error('Please select a valid booking date.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast.success('Booking successful! We will contact you soon.');
      setName('');
      setEmail('');
      setBookingDate(null);
      setComment('');
    }, 1000);
  };

  const isFormValid =
  name.trim() !== '' &&
  email.trim() !== '' &&
  isValidEmail(email) &&
  bookingDate instanceof Date;


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
          <p className={styles.errorMessage}>{error || 'The camper you are looking for does not exist.'}</p>
          <button onClick={() => router.push(ROUTES.CATALOG)} className={styles.backButton}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>

        <div className={styles.ratingLocation}>
          <div className={styles.rating} onClick={() => setActiveTab('reviews')}>
            <StarIcon className={styles.starIcon} />
            <span>
              {camper.rating} ({camper.reviews.length} {camper.reviews.length === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>

          <div className={styles.location}>
            <LocationIcon className={styles.locationIcon} />
            <span>{formatLocation(camper.location)}</span>
          </div>
        </div>

        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>

      {/* Gallery */}
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

      {/* Description */}
      <p className={styles.description}>{camper.description}</p>

      {/* Tabs */}
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

      {/* Main content */}
      <div className={styles.content}>
        {/* Left: Features/Reviews */}
        <div>{activeTab === 'features' ? <CamperFeatures camper={camper} /> : <CamperReviews reviews={camper.reviews} />}</div>

        {/* Right: Booking Form */}
        <div className={styles.bookingForm}>
          <h3 className={styles.formTitle}>Book your campervan now</h3>
          <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>

          <form onSubmit={handleBookingSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <DatePicker
              placeholderText="Booking date*"
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              className={styles.input} // same width as other fields
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.textarea}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send'}
            </button>
          </form>

          {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            style={{ zIndex: 99999 }}
          /> */}
        </div>

      </div>
    </div>
  );
}
