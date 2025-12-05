import React from 'react';
import { Camper } from '@/types';
import { Icon } from '@/components/ui/icons';
import styles from '@/styles/modules/CamperDetails.module.css';

interface CamperFeaturesProps {
  camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  const features = [
    { 
      key: 'transmission', 
      label: 'Automatic', 
      icon: 'automatic', 
      condition: camper.transmission === 'automatic' 
    },
    { 
      key: 'engine', 
      label: camper.engine === 'petrol' ? 'Petrol' : 'Diesel', 
      icon: 'petrol',
      condition: !!camper.engine 
    },
    { 
      key: 'AC', 
      label: 'AC', 
      icon: 'ac', 
      condition: camper.AC 
    },
    { 
      key: 'bathroom', 
      label: 'Bathroom', 
      icon: 'bathroom', 
      condition: camper.bathroom 
    },
    { 
      key: 'kitchen', 
      label: 'Kitchen', 
      icon: 'kitchen', 
      condition: camper.kitchen 
    },
    { 
      key: 'TV', 
      label: 'TV', 
      icon: 'tv', 
      condition: camper.TV 
    },
    { 
      key: 'radio', 
      label: 'Radio', 
      icon: 'radio',
      condition: camper.radio 
    },
    { 
      key: 'refrigerator', 
      label: 'Refrigerator', 
      icon: 'refrigerator',
      condition: camper.refrigerator 
    },
    { 
      key: 'microwave', 
      label: 'Microwave', 
      icon: 'microwave',
      condition: camper.microwave 
    },
    { 
      key: 'gas', 
      label: 'Gas', 
      icon: 'gas',
      condition: camper.gas 
    },
    { 
      key: 'water', 
      label: 'Water', 
      icon: 'water',
      condition: camper.water 
    },
  ];

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
      <div className={styles.featuresList}>
        {features.map((feature) => 
          feature.condition ? (
            <div key={feature.key} className={styles.featureItem}>
              <Icon name={feature.icon} width={20} height={20} className={styles.featureIcon} />
              <span>{feature.label}</span>
            </div>
          ) : null
        )}
      </div>

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