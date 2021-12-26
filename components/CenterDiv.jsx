import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { LogoutIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';

import profileImage from '../assets/profile.jpg';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistDataAtom } from '../atoms/playlistAtom';
import { useSpotify } from '../hooks/useSpotify';

import AllSongs from '../components/AllSongs';

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
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(playlistId).then((res) => {
        console.log(res.body);
        setplaylistData(res.body);
      });
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <header className='absolute top-5 right-7'>
        <div
          className='flex items-center space-x-2 p-1 pr-2.5 cursor-pointer rounded-full bg-black text-white hover:bg-gray-900'
          onClick={() => signOut()}
        >
          <Image
            src={session?.user.image || profileImage}
            alt={session?.user.name}
            height={30}
            width={30}
            className='h-9 w-9 rounded-full'
          />
          <h2 className='font-medium'>{session?.user.name}</h2>
          <LogoutIcon className='h-5 w5' />
        </div>
      </header>

      <div
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${startColor} h-80 text-white p-8`}
      >
        <img
          src={playlistData?.images[0].url}
          alt={playlistData?.name}
          className='h-44 w-44 shadow-2xl'
        />

        <div>
          <p className='font-bold'>PLAYLIST</p>
          <h2 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
            {playlistData?.name}
          </h2>
          <p className='text-gray-200'>{playlistData?.description}</p>
          <p className='text-gray-300 mt-2'>
            By{' '}
            <span className='font-semibold'>
              {playlistData?.owner.display_name}
            </span>
            , {playlistData?.tracks.total} songs
          </p>
        </div>
      </div>

      <AllSongs />
    </div>
  );
};

export default CenterDiv;
