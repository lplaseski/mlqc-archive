import React from 'react';
import Link from 'next/link';

const sections = [
  {
    href: '/karma',
    title: 'Karma Cards',
    description:
      "Browse SSR and character karma cards organized by banner and release date. Watch story voicelines and explore each card's artwork.",
    accent: 'border-indigo-700',
    label: 'Browse cards',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
      </svg>
    ),
  },
  {
    href: '/banners',
    title: 'Banner Assets',
    description:
      'View full event banner artwork and promotional images from every banner run, organized by year.',
    accent: 'border-indigo-700',
    label: 'View banners',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
      </svg>
    ),
  },
  {
    href: '/chat-messages',
    title: 'Chat Messages',
    description:
      'Replay the in-game chat conversations with Kiro, Gavin, Victor, Lucien, and Shaw exactly as they appeared.',
    accent: 'border-indigo-700',
    label: 'Read chats',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' />
      </svg>
    ),
  },
  {
    href: '/moments-posts',
    title: 'Moments Posts',
    description:
      "Browse the Moments feed story posts — character interactions and story snippets from the game's social feed.",
    accent: 'border-indigo-700',
    label: 'Read posts',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z' />
      </svg>
    ),
  },
  {
    href: '/download',
    title: 'Mobile App',
    description:
      'Download the companion app to swipe through karma cards on your phone, just like you would in-game.',
    accent: 'border-indigo-700',
    label: 'Get the app',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3' />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className='min-h-screen bg-slate-50 font-(family-name:--font-noto-sans)'>
      {/* Hero */}
      <div className="relative min-h-72 bg-[url('/karma-header.jpg')] bg-cover bg-top md:min-h-90 xl:min-h-110 2xl:min-h-130">
        <div className='absolute inset-0 bg-linear-to-t from-indigo-950/85 via-indigo-950/30 to-transparent' />
        <div className='absolute right-0 bottom-0 left-0 px-8 py-6 md:px-14 md:py-8'>
          <h1 className='mb-3 font-(family-name:--font-noto-serif) text-4xl font-bold text-white md:text-5xl'>
            Mr Love: Queen&apos;s Choice
          </h1>
          <p className='text-md max-w-xl text-white/80'>
            A community archive preserving karma cards, event banners, chat
            messages, and story posts from the beloved mobile game.
          </p>
        </div>
      </div>

      {/* Section cards */}
      <main className='mx-auto max-w-5xl px-6 py-12'>
        <h2 className='mb-6 text-xs font-semibold tracking-widest text-gray-400 uppercase'>
          What&apos;s in the archive
        </h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group flex flex-col gap-3 rounded-xl border border-t-4 border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${section.accent}`}
            >
              <span className='text-indigo-700'>{section.icon}</span>
              <h3 className='text-lg font-bold text-indigo-950'>
                {section.title}
              </h3>
              <p className='flex-1 text-sm leading-relaxed text-gray-500'>
                {section.description}
              </p>
              <span className='text-sm font-semibold text-indigo-700 group-hover:underline'>
                {section.label} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
