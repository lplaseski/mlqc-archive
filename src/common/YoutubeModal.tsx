import React, { useEffect } from 'react';

interface ModalProps {
  videoUrl: string;
  onClose: () => void;
}

const Modal = ({ videoUrl, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onClose} />
      <div className='relative m-20 aspect-video h-9/10 rounded-sm bg-white p-6 shadow-lg'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='absolute -top-10 -right-10 h-10 w-10 cursor-pointer rounded-full bg-white p-1 text-gray-500 shadow-2xl hover:font-bold hover:text-indigo-800'
        >
          ✕
        </button>
        <div className='h-full w-full'>
          <iframe
            src={videoUrl}
            title='YouTube Video'
            className='h-full w-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;
