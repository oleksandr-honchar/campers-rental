'use client';

import { useEffect, useState } from 'react';

import { useCampersStore } from '@/store/useCampersStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import { getCampers } from '@/services/campers';
import { Loader } from '@/components/ui/Loader';
import { CamperCard } from '@/components/catalog/CamperCard';
import FiltersSidebar from '@/components/FiltersSidebar';
import { Camper, GetCampersParams, VehicleForm } from '@/types';
import { FiltersState } from '@/types/filters';
import styles from '@/styles/modules/Catalog.module.css';

export default function CatalogPage() {
  const { 
    campers, 
    loading, 
    currentPage, 
    setCampers, 
    addCampers, 
    setLoading, 
    setTotal, 
    setCurrentPage, 
    resetCampers 
  } = useCampersStore();
  
  const { location, form, equipment, setLocation, setForm, toggleEquipment, clearEquipment } = useFiltersStore();
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 4;

  const fetchCampers = async (page: number, reset: boolean = false) => {
    try {
      setLoading(true);
      
      const params: GetCampersParams = {
        page,
        limit: ITEMS_PER_PAGE,
      };

      if (location) params.location = location;
      if (form) params.form = form as VehicleForm;
      
      equipment.forEach((item) => {
        if (item === 'AC') params.AC = true;
        if (item === 'transmission') params.transmission = 'automatic';
        if (item === 'kitchen') params.kitchen = true;
        if (item === 'bathroom') params.bathroom = true;
        if (item === 'TV') params.TV = true;
        if (item === 'radio') params.radio = true;
        if (item === 'refrigerator') params.refrigerator = true;
        if (item === 'microwave') params.microwave = true;
        if (item === 'gas') params.gas = true;
        if (item === 'water') params.water = true;
      });

      const data = await getCampers(params);
      
      if (reset) {
        setCampers(data.items as Camper[]);
      } else {
        addCampers(data.items as Camper[]);
      }
      
      setTotal(data.total);
      const newTotal = reset ? data.items.length : campers.length + data.items.length;
      setHasMore(newTotal < data.total);
} catch (error) {
    
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        setCampers([]);
        setTotal(0);
        setHasMore(false);
      } else {

        console.error('Error fetching campers:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetCampers();
    fetchCampers(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, form, equipment]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCampers(nextPage, false);
  };

  const handleSearch = (filters: FiltersState) => {

    setLocation(filters.location);
    setForm(filters.form);
    

    clearEquipment();
    filters.equipment.forEach(item => {
      toggleEquipment(item);
    });


    resetCampers();
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>Catalog</h1>
      
      <div className={styles.catalogGrid}>
        <FiltersSidebar 
          onSearch={handleSearch}
          initialFilters={{
            location,
            form,
            equipment
          }}
        />

        <div className={styles.campersList}>
          {loading && campers.length === 0 ? (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles.campersGrid}>
                {campers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>

              {hasMore && !loading && (
                <div className={styles.loadMore}>
                  <button onClick={handleLoadMore}>
                    Load more
                  </button>
                </div>
              )}

              {loading && campers.length > 0 && (
                <div className={styles.loaderWrapper}>
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}