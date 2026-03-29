import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getBanners from '@/actions/getBanners';
import { getImageMeta } from '@/actions/getImageMeta';
import BannerDetail from './BannerDetail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const banners = await getBanners();
  const banner = banners.find((b) => b.id === Number(id));
  if (!banner) return {};
  return {
    title: `${banner.name} | Mr Love: Queen's Choice Archive`,
    description: `Browse all images from the ${banner.name} banner in Mr Love: Queen's Choice.`,
  };
}

const BannerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const banners = await getBanners();
  const banner = banners.find((b) => b.id === Number(id));

  if (!banner) notFound();

  const images = (await getImageMeta('mlqc-banners', `${banner.name}/`)) || [];
  const imageKeys = images.map((img) => img.Key || '').filter(Boolean);

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
