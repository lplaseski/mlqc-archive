const LoadingBanners = () => {
  return (
    <div className='flex min-h-screen items-center justify-center font-[family-name:var(--font-noto-sans)]'>
      <main className='flex w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />
        <div className='p-6'>
          {[1, 2].map((year) => (
            <div key={year} className='mb-10'>
              <div className='mb-4 h-7 w-16 animate-pulse rounded bg-gray-200' />
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className='overflow-hidden rounded-xl border border-gray-200 shadow-md'>
                    <div className='h-48 animate-pulse bg-gray-200' />
                    <div className='p-3'>
                      <div className='mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200' />
                      <div className='h-3 w-1/2 animate-pulse rounded bg-gray-200' />
                    </div>
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

export default LoadingBanners;
