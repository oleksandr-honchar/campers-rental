'use client';

import { useState } from 'react';
import styles from './FiltersSidebar.module.css';
import { FiltersState, EquipmentType } from '@/types/filters';
import { VehicleForm } from '@/types';
import {
  LocationIcon,
  ACIcon,
  AutomaticIcon,
  KitchenIcon,
  TVIcon,
  BathroomIcon,
  VanIcon,
  FullyIntegratedIcon,
  AlcoveIcon,
} from './icons';

interface FiltersSidebarProps {
  onSearch: (filters: FiltersState) => void;
  initialFilters?: FiltersState;
}

// Список обладнання для відображення (згідно з ТЗ)
const EQUIPMENT_OPTIONS: Array<{ id: EquipmentType; label: string }> = [
  { id: 'AC', label: 'AC' },
  { id: 'transmission', label: 'Automatic' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'TV', label: 'TV' },
  { id: 'bathroom', label: 'Bathroom' }
];

// Мапа іконок для обладнання
const EQUIPMENT_ICONS: Record<EquipmentType, React.ComponentType<{ className?: string }>> = {
  AC: ACIcon,
  transmission: AutomaticIcon,
  kitchen: KitchenIcon,
  TV: TVIcon,
  bathroom: BathroomIcon,
  radio: ACIcon,
  refrigerator: KitchenIcon,
  microwave: KitchenIcon,
  gas: KitchenIcon,
  water: BathroomIcon,
};

// Типи транспорту
const VEHICLE_TYPES: Array<{ id: VehicleForm; label: string }> = [
  { id: 'panelTruck', label: 'Van' },
  { id: 'fullyIntegrated', label: 'Fully Integrated' },
  { id: 'alcove', label: 'Alcove' }
];

// Мапа іконок для типів транспорту
const VEHICLE_TYPE_ICONS: Record<VehicleForm, React.ComponentType<{ className?: string }>> = {
  panelTruck: VanIcon,
  fullyIntegrated: FullyIntegratedIcon,
  alcove: AlcoveIcon,
};

export default function FiltersSidebar({ 
  onSearch,
  initialFilters 
}: FiltersSidebarProps) {
  const [filters, setFilters] = useState<FiltersState>(
    initialFilters || {
      location: '',
      form: '',
      equipment: []
    }
  );

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  const handleEquipmentToggle = (equipment: EquipmentType) => {
    setFilters(prev => {
      const isSelected = prev.equipment.includes(equipment);
      
      if (isSelected) {
        // Видаляємо якщо вже обрано
        return {
          ...prev,
          equipment: prev.equipment.filter(item => item !== equipment)
        };
      } else {
        // Додаємо якщо не обрано
        return {
          ...prev,
          equipment: [...prev.equipment, equipment]
        };
      }
    });
  };
    
  const handleVehicleTypeChange = (type: VehicleForm) => {
    setFilters(prev => ({
      ...prev,
      form: prev.form === type ? '' : type
    }));
  };
    
  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Location section */}
      <div className={styles.section}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <div className={styles.locationWrapper}>
        <LocationIcon className={styles.locationIcon} />
          <input
            id="location"
            type="text"
            className={styles.locationInput}
            placeholder="City"
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

{/* Filters section */}
      <div className={styles.filtersSection}>
        <h3 className={styles.filtersTitle}>Filters</h3>
        
        <div className={styles.equipmentGroup}>
          <span className={styles.label}>Vehicle equipment</span>
          
          <div className={styles.equipmentGrid}>
            {EQUIPMENT_OPTIONS.map(option => (
              <div
                key={option.id}
                className={`${styles.equipmentItem} ${
                  filters.equipment.includes(option.id) ? styles.active : ''
                }`}
                onClick={() => handleEquipmentToggle(option.id)}
              >
                {(() => {
                  const Icon = EQUIPMENT_ICONS[option.id];
                  return <Icon className={styles.equipmentIcon} />;
                })()}
                <span className={styles.equipmentLabel}>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Vehicle type section */}
      <div className={styles.vehicleTypeGroup}>
        <span className={styles.label}>Vehicle type</span>
        
        <div className={styles.vehicleTypeGrid}>
          {VEHICLE_TYPES.map(type => (
            <div
              key={type.id}
              className={`${styles.vehicleTypeItem} ${
                filters.form === type.id ? styles.active : ''
              }`}
              onClick={() => handleVehicleTypeChange(type.id)}
            >
              {(() => {
                const Icon = VEHICLE_TYPE_ICONS[type.id];
                return <Icon className={styles.vehicleTypeIcon} />;
              })()}
              <span className={styles.vehicleTypeLabel}>{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search button */}
      <button 
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
      >
        Search
      </button>
    </aside>
  );
}