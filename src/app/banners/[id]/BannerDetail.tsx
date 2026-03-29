'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
};

const BannerDetail = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {images.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedImage(key)}
            className='relative h-40 w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-opacity hover:opacity-90'
          >
            <Image
              alt={key}
              src={`https://banners.mlqc-archive.com/${key}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
          onClick={() => setSelectedImage(null)}
        >
          <div
            className='relative max-h-[90vh] max-w-[90vw]'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute -top-8 right-0 text-xl font-bold text-white'
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <Image
              alt={selectedImage}
              src={`https://banners.mlqc-archive.com/${selectedImage}`}
              width={1200}
              height={800}
              style={{ objectFit: 'contain', maxHeight: '90vh', width: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BannerDetail;
