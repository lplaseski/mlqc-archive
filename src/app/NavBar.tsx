import Link from 'next/link';
import { Suspense } from 'react';
import NavLinks from './NavLinks';

const NavBar = () => {
  return (
    <nav className='sticky top-0 z-40 flex items-center gap-6 bg-indigo-950 px-6 py-3 font-(family-name:--font-noto-sans)'>
      <Link
        href='/'
        className='text-sm font-bold text-white hover:text-indigo-200'
      >
        MLQC Archive
      </Link>
      <Suspense
        fallback={
          <div className='flex gap-4'>
            <span className='text-sm text-indigo-200'>Karma Cards</span>
            <span className='text-sm text-indigo-200'>Banners</span>
            <span className='text-sm text-indigo-200'>Chat Messages</span>
          </div>
        }
      >
        <NavLinks />
      </Suspense>
    </nav>
  );
};

export default NavBar;
