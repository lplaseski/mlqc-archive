import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import getBanners from '@/actions/getBanners';
import { getImageMeta } from '@/actions/getImageMeta';

export const metadata: Metadata = {
  title: "Banners | Mr Love: Queen's Choice Archive",
  description:
    "Browse all banners from Mr Love: Queen's Choice, organized by date.",
};

const BannerListPage = async () => {
  const banners = await getBanners();
  const visibleBanners = banners.reduce(
    (acc, banner) => {
      if (
        banner.name === 'Launch' ||
        banner.name === 'Top Up' ||
        banner.name === 'Major Event' ||
        banner.name === 'Fragrant Sunshine'
      ) {
        return acc;
      }

      const year = new Date(banner.date).getFullYear().toString();
      acc[year] = [...(acc[year] || []), banner];
      return acc;
    },
    {} as Record<string, typeof banners>
  );

  const images = (await getImageMeta('mlqc-banners')) || [];
  const imageByBanner = images.reduce(
    (acc: Record<string, Array<{ Key?: string }>>, image) => {
      const [bannerName] = image.Key?.split('/') || [];
      if (bannerName) {
        acc[bannerName] = [...(acc[bannerName] || []), image];
      }
      return acc;
    },
    {}
  );

  return (
    <div className='flex min-h-screen items-center justify-center font-[family-name:var(--font-noto-sans)]'>
      <main className='flex w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />
        <div className='p-6'>
          {Object.entries(visibleBanners).map(([year, yearBanners]) => (
            <div key={year} className='mb-10'>
              <h2 className='mb-4 border-b-2 border-indigo-950 pb-1 text-xl font-bold text-indigo-950'>
                {year}
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {yearBanners.map((banner) => {
                  const previewImages = (
                    imageByBanner[banner.name] || []
                  ).slice(0, 2);
                  return (
                    <Link
                      key={banner.id}
                      href={`/banners/${banner.id}`}
                      className='overflow-hidden rounded-xl border border-gray-200 shadow-md transition-shadow hover:shadow-lg'
                    >
                      <div className='flex h-48 overflow-hidden'>
                        {previewImages.length === 0 && (
                          <div className='flex h-full w-full items-center justify-center bg-gray-100 text-gray-400'>
                            No images
                          </div>
                        )}
                        {previewImages.map((image) => (
                          <div
                            key={image.Key}
                            className='relative flex-1 overflow-hidden'
                          >
                            <Image
                              alt={image.Key || ''}
                              src={`https://banners.mlqc-archive.com/${image.Key}`}
                              fill
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'top center',
                              }}
                              sizes='(max-width: 768px) 50vw, 25vw'
                            />
                          </div>
                        ))}
                      </div>
                      <div className='p-3'>
                        <h3 className='font-bold text-gray-900'>
                          {banner.name}
                        </h3>
                        <p className='text-sm text-gray-500'>{banner.date}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BannerListPage;
