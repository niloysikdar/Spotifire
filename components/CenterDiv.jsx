import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';

import profileImage from '../assets/profile.jpg';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const CenterDiv = () => {
  const { data: session } = useSession();
  const [startColor, setStartColor] = useState(null);

  useEffect(() => {
    const newColor = shuffle(colors)[0];
    setStartColor(newColor);
  }, []);

  return (
    <div className='flex-grow'>
      <header className='absolute top-5 right-8'>
        <div className='flex items-center space-x-2 p-1 pr-2.5 cursor-pointer rounded-full bg-black text-white hover:bg-gray-900'>
          <Image
            src={session?.user.image || profileImage}
            alt={session?.user.name}
            height={35}
            width={35}
            className='h-9 w-9 rounded-full'
          />
          <h2 className='font-medium'>{session?.user.name}</h2>
          <ChevronDownIcon className='h-5 w5' />
        </div>
      </header>

      <div
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${startColor} h-80 w-100`}
      >
        <h2 className='text-white'>{startColor}</h2>
      </div>
    </div>
  );
};

export default CenterDiv;
