const LoadingBannerDetail = () => {
  return (
    <div className='flex min-h-screen items-center justify-center font-[family-name:var(--font-noto-sans)]'>
      <main className='flex min-h-screen w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />
        <div className='p-6'>
          <div className='mb-1 h-8 w-48 animate-pulse rounded bg-gray-200' />
          <div className='mb-6 h-4 w-24 animate-pulse rounded bg-gray-200' />
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className='h-40 animate-pulse rounded-lg bg-gray-200' />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingBannerDetail;
