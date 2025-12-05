import React from 'react';
import { CamperDetails } from '@/types/camper';
import styles from '@/styles/modules/CamperDetails.module.css';

interface CamperFeaturesProps {
  camper: CamperDetails;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  // Масив характеристик для відображення
  const features = [
    { key: 'transmission', label: 'Automatic', icon: 'diagram', condition: camper.transmission === 'automatic' },
    { key: 'engine', label: camper.engine === 'petrol' ? 'Petrol' : 'Diesel', icon: 'fuel-pump', condition: !!camper.engine },
    { key: 'AC', label: 'AC', icon: 'wind', condition: camper.AC },
    { key: 'bathroom', label: 'Bathroom', icon: 'ph_shower', condition: camper.bathroom },
    { key: 'kitchen', label: 'Kitchen', icon: 'cup-hot', condition: camper.kitchen },
    { key: 'TV', label: 'TV', icon: 'tv', condition: camper.TV },
    { key: 'radio', label: 'Radio', icon: 'ui-radios', condition: camper.radio },
    { key: 'refrigerator', label: 'Refrigerator', icon: 'solar_fridge-outline', condition: camper.refrigerator },
    { key: 'microwave', label: 'Microwave', icon: 'lucide_microwave', condition: camper.microwave },
    { key: 'gas', label: 'Gas', icon: 'hugeicons_gas-stove', condition: camper.gas },
    { key: 'water', label: 'Water', icon: 'ion_water-outline', condition: camper.water },
  ];

  // Деталі транспортного засобу
  const details = [
    { label: 'Form', value: camper.form },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <div className={styles.features}>
      {/* Список характеристик */}
      <div className={styles.featuresList}>
        {features.map((feature) => 
          feature.condition ? (
            <div key={feature.key} className={styles.featureItem}>
              <svg className={styles.featureIcon}>
                <use href={`/sprite.svg#${feature.icon}`} />
              </svg>
              <span>{feature.label}</span>
            </div>
          ) : null
        )}
      </div>

      {/* Vehicle Details */}
      <div className={styles.vehicleDetails}>
        <h3 className={styles.vehicleDetailsTitle}>Vehicle details</h3>
        <div className={styles.detailsList}>
          {details.map((detail) => 
            detail.value ? (
              <div key={detail.label} className={styles.detailItem}>
                <span className={styles.detailLabel}>{detail.label}</span>
                <span>{detail.value}</span>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default CamperFeatures;