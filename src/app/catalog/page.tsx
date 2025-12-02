'use client';

import { useEffect, useState } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import { getCampers } from '@/services/campers';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';

export default function CatalogPage() {
  const { campers, loading, total, currentPage, setCampers, addCampers, setLoading, setTotal, setCurrentPage, resetCampers } = useCampersStore();
  const { location, form, equipment } = useFiltersStore();
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 4;

  const fetchCampers = async (page: number, reset: boolean = false) => {
    try {
      setLoading(true);
      
      const params: any = {
        page,
        limit: ITEMS_PER_PAGE,
      };

      if (location) params.location = location;
      if (form) params.form = form;
      
      // Додати обране обладнання як окремі параметри
      equipment.forEach((item) => {
        params[item] = true;
      });

      const data = await getCampers(params);
      
      if (reset) {
        setCampers(data.items);
      } else {
        addCampers(data.items);
      }
      
      setTotal(data.total);
      setHasMore(campers.length + data.items.length < data.total);
    } catch (error) {
      console.error('Error fetching campers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetCampers();
    fetchCampers(1, true);
  }, [location, form, equipment]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCampers(nextPage, false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catalog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <p className="text-gray-500">Filter components will be added here</p>
          </div>
        </aside>

        {/* Campers List */}
        <div className="md:col-span-2">
          {loading && campers.length === 0 ? (
            <Loader />
          ) : (
            <>
              <div className="space-y-6">
                {campers.map((camper) => (
                  <div key={camper.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{camper.name}</h3>
                    <p className="text-gray-600">{camper.location}</p>
                    <p className="text-lg font-bold mt-2">€{camper.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {hasMore && !loading && (
                <div className="mt-8 text-center">
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
