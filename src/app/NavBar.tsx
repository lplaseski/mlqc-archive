'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/karma', label: 'Karma Cards' },
  { href: '/banners', label: 'Banners' },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='sticky top-0 z-40 flex items-center gap-6 bg-indigo-950 px-6 py-3 font-[family-name:var(--font-noto-sans)]'>
      <Link href='/' className='text-sm font-bold text-white hover:text-indigo-200'>
        MLQC Archive
      </Link>
      <div className='flex gap-4'>
        {links.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm ${isActive ? 'font-semibold text-white underline underline-offset-4' : 'text-indigo-200 hover:text-white'}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
