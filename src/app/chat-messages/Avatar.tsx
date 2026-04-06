'use client';

import { CHARS } from './charInfo';

const CHARACTERS = Object.values(CHARS).map((c) => c.name.toLowerCase());

const SIZES = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
};

const Avatar = ({
  character,
  size = 'sm',
}: {
  character: string;
  size?: keyof typeof SIZES;
}) => {
  if (!CHARACTERS.includes(character.toLowerCase()) && character !== 'mc') {
    return (
      <div
        className={`flex ${SIZES[size]} items-center justify-center rounded-full text-xl font-bold`}
        style={{ background: '#37474f' }}
      >
        💌
      </div>
    );
  }

  const image = `/chat/profile/${character.toLowerCase()}.jpg`;
  return (
    <div
      className={`flex ${SIZES[size]} items-center justify-center rounded-full bg-cover bg-center text-xl font-bold`}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

export default Avatar;
