'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCamperById } from '@/services/campers';
import { Camper } from '@/types';
import { Loader } from '@/components/ui/Loader';

export default function CamperDetailsPage() {
  const params = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        const data = await getCamperById(params.id as string);
        setCamper(data);
      } catch (error) {
        console.error('Error fetching camper:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [params.id]);

  if (loading) return <Loader />;
  if (!camper) return <div>Camper not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{camper.name}</h1>
      <p className="text-gray-600 mb-2">{camper.location}</p>
      <p className="text-2xl font-bold mb-6">€{camper.price.toFixed(2)}</p>

      <div className="mb-8">
        <p className="text-gray-700">{camper.description}</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'features'
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'reviews'
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'features' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Vehicle Details</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Form: {camper.form}</li>
              <li>Length: {camper.length}</li>
              <li>Width: {camper.width}</li>
              <li>Height: {camper.height}</li>
              <li>Tank: {camper.tank}</li>
              <li>Consumption: {camper.consumption}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Transmission: {camper.transmission}</li>
              <li>Engine: {camper.engine}</li>
              {camper.AC && <li>✓ AC</li>}
              {camper.bathroom && <li>✓ Bathroom</li>}
              {camper.kitchen && <li>✓ Kitchen</li>}
              {camper.TV && <li>✓ TV</li>}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {camper.reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{review.reviewer_name}</span>
                <span className="ml-4 text-yellow-500">{'⭐'.repeat(review.reviewer_rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
