import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';

import profileImage from '../assets/profile.jpg';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistDataAtom } from '../atoms/playlistAtom';
import { useSpotify } from '../hooks/useSpotify';

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
  const spotifyApi = useSpotify();
  const [startColor, setStartColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlistData, setplaylistData] = useRecoilState(playlistDataAtom);

  useEffect(() => {
    const newColor = shuffle(colors)[0];
    setStartColor(newColor);
  }, [playlistId]);

  useEffect(() => {
    if (!playlistData && spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(playlistId).then((res) => {
        console.log(res.body);
        setplaylistData(res.body);
      });
    }
  }, [session, spotifyApi, playlistId]);

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
        <img
          src={playlistData?.images[0].url}
          alt={playlistData?.name}
          className='h-44 w-44 shadow-2xl'
        />

        <h2 className='text-white'>{playlistData?.name}</h2>
      </div>
    </div>
  );
};

export default CenterDiv;
