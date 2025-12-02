'use client';

import { useEffect, useState } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import { getCampers } from '@/services/campers';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Camper, GetCampersParams, VehicleForm } from '@/types';
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
  
  const { location, form, equipment } = useFiltersStore();
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
      
      // Додати обране обладнання як окремі параметри
      equipment.forEach((item) => {
        if (item === 'AC') params.AC = true;
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
      console.error('Error fetching campers:', error);
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

  return (
    <div className={styles.container}>
      <h1>Catalog</h1>
      
      <div className={styles.catalogGrid}>
        {/* Filters Sidebar */}
        <aside className={styles.filtersSidebar}>
          <div className={styles.filtersCard}>
            <h2>Filters</h2>
            <p>Filter components will be added here</p>
          </div>
        </aside>

        {/* Campers List */}
        <div className={styles.campersList}>
          {loading && campers.length === 0 ? (
            <Loader />
          ) : (
            <>
              <div className={styles.campersGrid}>
                {campers.map((camper) => (
                  <div key={camper.id} className={styles.camperCard}>
                    <h3>{camper.name}</h3>
                    <p>{camper.location}</p>
                    <p>€{camper.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {hasMore && !loading && (
                <div className={styles.loadMore}>
                  <Button onClick={handleLoadMore}>
                    Load More
                  </Button>
                </div>
              )}

              {loading && campers.length > 0 && <Loader />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}