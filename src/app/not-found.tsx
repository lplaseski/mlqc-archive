import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 font-[family-name:var(--font-noto-sans)]'>
      <h1 className='text-4xl font-bold text-indigo-950'>404</h1>
      <p className='text-gray-500'>This page could not be found.</p>
      <Link href='/' className='text-sm text-indigo-600 underline hover:text-indigo-900'>
        Go home
      </Link>
    </div>
  );
}
