import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import getBanners from '@/actions/getBanners';
import { getImageMeta } from '@/actions/getImageMeta';

export const metadata: Metadata = {
  title: "Karma Cards | Mr Love: Queen's Choice Archive",
  description:
    "Browse all Karma cards from Mr Love: Queen's Choice, organized by date, banner, and character.",
};

type ImageMeta = {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
};

const BannerPage = async () => {
  const banners = await getBanners();
  const visibleBanners = banners.filter((banner) => {
    return (
      banner.name !== 'Top Up' &&
      banner.name !== 'Major Event' &&
      banner.name !== 'Fragrant Sunshine'
    );
  });

  const images = (await getImageMeta('mlqc-banners')) || [];
  const imageByBanner = images.reduce(
    (acc: Record<string, Array<ImageMeta>>, image) => {
      const [bannerName] = image.Key?.split('/') || [];
      if (bannerName) {
        acc[bannerName] = [...(acc[bannerName] || []), image];
      }
      return acc;
    },
    {}
  );

  console.log(imageByBanner);
  return (
    <div className='flex min-h-screen min-w-fit items-center justify-center gap-8 font-[family-name:var(--font-noto-sans)]'>
      <main className='flex w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />

        <div>
          {visibleBanners.map((banner) => (
            <div
              key={banner.id}
              className='flex flex-col items-center gap-2 border-b-2 border-gray-300 p-4'
            >
              <h2>
                {banner.name} - {banner.date}
              </h2>
              <div className='grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12'>
                {imageByBanner[banner.name]?.map((image) => (
                  <div key={image.Key} className='relative h-40 w-30'>
                    <Image
                      alt={image.Key || ''}
                      src={`https://banners.mlqc-archive.com/${image.Key}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BannerPage;
