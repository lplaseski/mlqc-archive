'use client';

import React, { Fragment, useCallback, useState } from 'react';
// import Image from 'next/image';
import Modal from './YoutubeModal';

interface ViewVideoButtonProps {
  link: string;
  title: string;
}

const ViewVideoButton = ({ link, title }: ViewVideoButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('ViewVideoButton rendered with link:', link, 'and title:', title);
  const handleModalToggle = useCallback(() => {
    setIsModalOpen((v) => !v);
  }, []);

  const getVideoUrl = (url: string) => {
    const urlObj = new URL(url);
    if (urlObj.searchParams.get('list')) {
      const listId = urlObj.searchParams.get('list');
      return `https://www.youtube.com/embed/videoseries?list=${listId}`;
    }
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <button
        disabled={!link}
        onClick={handleModalToggle}
        className='flex cursor-pointer items-center gap-1 rounded-md border-1 border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
          />
        </svg>
        <span>View {title}</span>
      </button>
      {isModalOpen && (
        <Modal videoUrl={getVideoUrl(link)} onClose={handleModalToggle} />
      )}
    </>
  );
};

export default ViewVideoButton;
