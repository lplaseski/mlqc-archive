import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-full min-w-full items-center justify-center font-[family-name:var(--font-noto-sans)]'>
      <main className='flex h-full w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />
        <div className='flex flex-col items-center justify-center gap-6 p-16'>
          <h1 className='text-3xl font-bold text-indigo-950'>MLQC Archive</h1>
          <p className='text-gray-600'>
            A collection of archived content from Mr Love Queen&apos;s Choice.
          </p>
          <div className='flex flex-wrap gap-4'>
            <Link
              href='/karma'
              className='rounded-xl bg-indigo-900 px-8 py-3 font-bold text-white transition-colors hover:bg-indigo-700'
            >
              Karma Cards
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
