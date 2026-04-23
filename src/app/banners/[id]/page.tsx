'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import getBanners, { BannerEntry } from '@/actions/getBanners';
import { getImageMeta } from '@/actions/getImageMeta';
import BannerDetail from './BannerDetail';

const BannerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [banner, setBanner] = useState<BannerEntry | null>(null);
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const banners = await getBanners();
      const found = banners.find((b) => b.id === Number(id));

      if (!found) {
        setMissing(true);
        return;
      }

      const images = (await getImageMeta('mlqc-banners', `${found.name}/`)) || [];
      const keys = images.map((img) => img.Key || '').filter(Boolean);

      setBanner(found);
      setImageKeys(keys);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (missing) notFound();
  if (loading || !banner) return null;

  return (
    <div className='flex min-h-screen items-center justify-center font-[family-name:var(--font-noto-sans)]'>
      <main className='flex min-h-screen w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />
        <div className='p-6'>
          <h1 className='mb-1 text-2xl font-bold text-gray-900'>
            {banner.name}
          </h1>
          <p className='mb-6 text-gray-500'>{banner.date}</p>
          <BannerDetail images={imageKeys} />
        </div>
      </main>
    </div>
  );
};

export default BannerPage;
