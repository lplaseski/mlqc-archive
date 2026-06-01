'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/karma', label: 'Karma Cards' },
  { href: '/banners', label: 'Banners' },
  { href: '/chat-messages', label: 'Chat Messages' },
  { href: '/moments-posts', label: 'Moments Posts' },
  { href: '/download', label: 'Mobile App' },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
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
  );
};

export default NavLinks;
