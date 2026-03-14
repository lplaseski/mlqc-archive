import getSheetData from '@/actions/getSheetData';
import { MLQCCardType } from '@/common/types';
import React from 'react';
import Image from 'next/image';
import ViewVideoButton from '@/common/ViewVideoButton';
import {
  characterBorders,
  characterColors,
  characterHoverBg,
} from '@/app/constants';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${name} Karma Cards | Mr Love: Queen's Choice Archive`,
    description: `Browse all ${name} Karma cards from Mr Love: Queen's Choice.`,
  };
}

const FilteredKarmaPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const cards = await getSheetData('Sheet3');
  const { slug } = await params;
  const groups = cards.reduce(
    (acc, card, index) => {
      const { date, banner, viewed, character } = card;
      const cardWithIndex = { ...card, viewed: Number(viewed || '0'), index };
      if (date && banner && character?.toLowerCase() === slug) {
        if (acc?.[date]?.[banner]) {
          acc[date][banner].push(cardWithIndex);
        } else if (acc?.[date]) {
          acc[date][banner] = [cardWithIndex];
        } else {
          acc[date] = { [banner]: [cardWithIndex] };
        }
      }
      return acc;
    },
    {} as Record<string, Record<string, MLQCCardType[]>>
  );

  const sortedDates = Object.keys(groups).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const sortedGroups = sortedDates.map((date) => ({
    date,
    cards: groups[date],
  }));

  return (
    <div className='flex min-h-screen min-w-fit items-center justify-center gap-8 font-[family-name:var(--font-noto-sans)]'>
      <main className='flex w-full flex-col bg-white'>
        <header className="min-h-60 w-full border-b-20 border-indigo-950 bg-[url('/karma-header.jpg')] bg-cover bg-top bg-no-repeat md:min-h-70 xl:min-h-90 2xl:min-h-120" />
        <div className='flex flex-wrap items-center gap-6 p-10'>
          <p className='font-bold'>View by Character:</p>
          <Link
            href={`/karma`}
            key='all'
            className={`min-w-30 rounded-3xl border-2 border-gray-900 p-1 text-center text-sm font-bold text-gray-900 hover:bg-gray-100`}
          >
            View All
          </Link>
          {Object.entries(characterColors).map(([character, color]) => (
            <a
              href={`/karma/${character.toLowerCase()}`}
              key={character}
              className={`min-w-30 rounded-3xl border-2 p-1 text-center text-sm font-bold ${color} ${characterBorders[character?.toLowerCase() ?? ''] ?? 'border-gray-900'} ${characterHoverBg[character?.toLowerCase() ?? ''] ?? 'hover:bg-gray-900'}`}
            >
              {character.charAt(0).toUpperCase() + character.slice(1)}
            </a>
          ))}
        </div>

        <div className='flex flex-wrap items-center justify-center gap-6 p-10'>
          {sortedGroups.map((group) => (
            <div
              key={group.date}
              className='flex grow flex-col items-center justify-center gap-2'
            >
              <h1 className='text-md w-full border-b-2 border-indigo-400 p-1 text-center font-bold text-gray-600'>
                {group.date}
              </h1>
              <div className='flex w-full flex-row flex-wrap justify-around gap-2'>
                {Object.entries(group.cards).map(([banner, cards]) => (
                  <div
                    className='flex flex-col justify-between gap-2'
                    key={banner}
                  >
                    <h2 className='text-md rounded-md bg-indigo-900 px-5 py-1 text-center font-medium text-white'>
                      {banner}
                    </h2>
                    <div className='flex flex-row flex-wrap justify-center gap-3'>
                      {cards.map((card) => (
                        <div
                          className='flex flex-col justify-center gap-2 overflow-hidden rounded-xl border-1 border-gray-200 bg-white text-center align-middle shadow-md'
                          key={
                            card?.banner === 'Major Event'
                              ? `${card.card}`
                              : `${card.character}_${card.card}`
                          }
                        >
                          <div className='relative overflow-hidden'>
                            <Image
                              width={
                                card.banner === 'Major Event' ? 1564 : 1024
                              }
                              height={1564}
                              src={
                                card.banner === 'Major Event'
                                  ? `/karma/${card.card?.replaceAll(' ', '_').replaceAll("'", '%27')}.png`
                                  : `/karma/${card.character}_${card.card?.replaceAll(' ', '_').replaceAll("'", '%27')}.png` ||
                                    ''
                              }
                              alt={card.name || ''}
                              className={
                                card.banner === 'Major Event'
                                  ? 'h-90 w-96 object-cover'
                                  : 'h-90 w-60 object-cover'
                              }
                            />
                          </div>
                          <div className='flex grow flex-col items-center gap-3 rounded-md bg-white px-2 pb-3'>
                            {card?.character && (
                              <p
                                className={`min-w-30 rounded-3xl border-2 p-0.5 text-center text-sm font-bold ${characterColors[card.character?.toLowerCase() ?? ''] ?? 'text-gray-900'} ${characterBorders[card.character?.toLowerCase() ?? ''] ?? 'border-gray-900'}`}
                              >
                                {card?.character}
                              </p>
                            )}
                            {card?.banner === 'Major Event' && (
                              <p className='min-w-30 rounded-3xl border-2 border-purple-900 px-3 py-0.5 text-center text-sm font-bold text-purple-900'>
                                Chapter Release
                              </p>
                            )}
                            <p className='font-bold'>{card?.card}</p>
                            <ViewVideoButton
                              link={card.yt_link || ''}
                              title={card.name || 'TBA'}
                            />
                          </div>
                        </div>
                      ))}
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

export default FilteredKarmaPage;
